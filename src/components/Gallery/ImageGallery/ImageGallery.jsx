import { React } from 'react';
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

export { ImageGallery };
