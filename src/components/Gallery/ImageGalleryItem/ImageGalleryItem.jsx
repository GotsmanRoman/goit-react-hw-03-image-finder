import { React } from 'react';
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

export { ImageGalleryItem };
