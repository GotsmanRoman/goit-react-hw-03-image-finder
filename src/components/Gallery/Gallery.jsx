import React from 'react';

import { Container } from '../App.module';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class Gallery extends React.PureComponent {
  state = {
    array: [],
    query: '',
    page: 1,
    showModal: false,
    currentElement: null,
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
  handleSubmit = async event => {
    this.setState({ loading: true });
    if (event) {
      event.preventDefault();
      await this.getDataFromInput(event);
      this.setState({ array: [] });
      this.setState({ page: 1 });
    }
    try {
      const promise = await fetch(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=33277112-6a7c7acf3741d1ff176c90aa7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(result => result.json())
        .then(result => {
          return result.hits;
        });
      this.setState({ loading: false });
      this.setState(prevState => ({
        array: [...this.state.array, ...promise],
      }));
    } catch {
      console.log('Error');
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
        {this.state.query ? <Button onClick={() => this.handleMore} /> : false}
      </Container>
    );
  }
}
