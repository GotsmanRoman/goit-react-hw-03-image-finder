import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalItem, OverlayItem, ImageItem } from './Modal.module';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };
  handleClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <OverlayItem onClick={this.handleClick}>
        <ModalItem>
          <ImageItem
            src={this.props.currentElement.largeImageURL}
            alt={this.props.currentElement.tags}
          />
        </ModalItem>
      </OverlayItem>,
      modalRoot
    );
  }
}
