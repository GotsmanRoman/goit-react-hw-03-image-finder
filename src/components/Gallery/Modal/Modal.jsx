import { React } from 'react';
import { ModalItem, OverlayItem, ImageItem } from './Modal.module';

const Modal = () => {
  return (
    <OverlayItem class="overlay">
      <ModalItem>
        <ImageItem src="" alt="" />
      </ModalItem>
    </OverlayItem>
  );
};

export { Modal };
