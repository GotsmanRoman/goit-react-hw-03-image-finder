import { React } from 'react';
import { ButtonItem } from './Button.module';

const Button = ({ onClick }) => {
  return <ButtonItem onClick={onClick()}>Load More</ButtonItem>;
};

export { Button };
