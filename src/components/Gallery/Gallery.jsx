import React from 'react';
import { Container } from '../App.module';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class Gallery extends React.PureComponent {
  render() {
    return (
      <Container>
        <Searchbar />
        <ImageGallery>
          <ImageGalleryItem></ImageGalleryItem>
        </ImageGallery>
        <Button />
      </Container>
    );
  }
}
