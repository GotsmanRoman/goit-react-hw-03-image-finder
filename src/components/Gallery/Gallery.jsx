import React from 'react';

import { Container } from '../App.module';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchAPI } from './utils/API';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '100px',
  clickToClose: true,
});
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
    perPage: 12,
    showModal: false,
    currentElement: null,
    currentLoadedQuantity: 0,
    totalResultQuantity: 'none',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getImages();
    }
  }

  setCurrentImage = event => {
    this.setState({ currentImage: event.target.src });
  };

  isResponseOk = async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    } else if (response.data.total === 0) {
      showError();
      this.setState({ loading: false });
      return false;
    }
    return response.data;
  };

  handleMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handlerFormSubmit = ({ query }) => {
    this.setState({
      query: query,
      array: [],
      page: 1,
      loading: false,
      currentLoadedQuantity: 0,
    });
  };
  getImages = async () => {
    this.setState({ loading: true });
    const resultAPI = await fetchAPI(
      this.state.query,
      this.state.page,
      this.state.perPage
    );

    const responseParsed = await this.isResponseOk(resultAPI);
    if (responseParsed !== false) {
      this.setState({ loading: false });
      this.setState(prevState => ({
        array: [...prevState.array, ...responseParsed.hits],
      }));
      this.setState({ totalResultQuantity: responseParsed.totalHits });
      this.setState(prevState => ({
        currentLoadedQuantity:
          prevState.currentLoadedQuantity + responseParsed.hits.length,
      }));
    }
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
        <Searchbar onSubmit={this.handlerFormSubmit} />
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
