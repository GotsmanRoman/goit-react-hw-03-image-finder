import { React } from 'react';
import PropTypes from 'prop-types';
import { ButtonItem } from './Button.module';

const Button = ({ onClick }) => {
  return <ButtonItem onClick={onClick()}>Load More</ButtonItem>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { Button };
