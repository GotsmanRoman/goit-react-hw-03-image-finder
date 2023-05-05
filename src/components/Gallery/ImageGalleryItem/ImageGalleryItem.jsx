import { React } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.module';

const ImageGalleryItem = ({ imageUrl, alt, onClick, currentElement }) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={imageUrl}
        alt={alt}
        onClick={event => onClick(event, currentElement)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired,
};

export { ImageGalleryItem };
