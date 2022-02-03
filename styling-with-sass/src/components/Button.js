import React from 'react';
import './Button.scss';

function Button({ children, size }) {
  return <button className={['Button', size].join(' ')}>{children}</button>;
}

Button.defaultProps = {
  size: 'medium'
};

export default Button;