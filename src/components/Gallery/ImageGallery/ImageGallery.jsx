import { React } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.module';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ array, onClick }) => {
  return (
    <ImageGalleryList>
      {array.map(item => {
        return (
          <ImageGalleryItem
            imageUrl={item.previewURL}
            largeImageURL={item.largeImageURL}
            key={item.id}
            onClick={onClick}
            alt={item.tags}
            currentElement={item}
          ></ImageGalleryItem>
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ImageGallery };
