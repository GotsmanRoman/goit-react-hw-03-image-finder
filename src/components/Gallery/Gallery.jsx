import React from 'react';

import { Container } from '../App.module';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

import Notiflix from 'notiflix';
import axios from 'axios';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '100px',
  clickToClose: true,
});
function showNotify(valueToFade = '2000') {
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results.`,
    {
      timeout: valueToFade,
    }
  );
}
function showError(valueToFade = '2000') {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: valueToFade,
    }
  );
}

export class Gallery extends React.PureComponent {
  state = {
    array: [],
    query: '',
    page: 1,
    showModal: false,
    currentElement: null,
    currentLoadedQuantity: 0,
    totalResultQuantity: 'none',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.handleSubmit();
    }
  }

  setCurrentImage = event => {
    this.setState({ currentImage: event.target.src });
  };

  getDataFromInput = async event => {
    const form = event.currentTarget;
    this.setState({ query: form.elements.search.value });
  };

  isResponseOk = async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    } else if (response.data.total === 0) {
      showError();
      this.setState({ loading: false });
      return;
    }
    this.state.totalResultQuantity = response.data.totalHits;
    return response.data;
  };

  handleSubmit = async event => {
    this.setState({ loading: true });
    if (event) {
      event.preventDefault();
      await this.getDataFromInput(event);
      this.setState({ array: [] });
      this.setState({ page: 1 });
    }
    try {
      const response = await axios.get('https://pixabay.com/api/?', {
        params: {
          key: '33277112-6a7c7acf3741d1ff176c90aa7',
          q: this.state.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: this.state.page,
        },
      });
      const responseParsed = await this.isResponseOk(response);

      if (responseParsed) {
        this.setState({ loading: false });
        this.setState(prevState => ({
          array: [...prevState.array, ...responseParsed.hits],
        }));
        this.setState(prevState => ({
          currentLoadedQuantity:
            prevState.currentLoadedQuantity + responseParsed.hits.length,
        }));
        return responseParsed;
      }
    } catch {
      console.log('Error');
      showNotify();
    }
  };

  handleMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (event, currentElement) => {
    this.setState({ currentElement: currentElement });

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <Container>
        {this.state.showModal && (
          <Modal
            onClick={this.toggleModal}
            currentElement={this.state.currentElement}
          />
        )}
        <Searchbar onSubmit={() => this.handleSubmit} />
        <>
          {this.state.loading ? (
            <Loader></Loader>
          ) : (
            <ImageGallery array={this.state.array} onClick={this.toggleModal} />
          )}
        </>
        {this.state.array.length !== 0 &&
        this.state.currentLoadedQuantity !== this.state.totalResultQuantity ? (
          <Button onClick={() => this.handleMore} />
        ) : (
          false
        )}
      </Container>
    );
  }
}
