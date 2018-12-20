import React from 'react';
import './styles.scss';

export default props => {
  const { className, icon, children } = props;
  return <button {...props} className={`Button btn btn-dark rounded${className ? ` ${className}` : ''}`}>{children}{icon && <i className={icon} />}</button>
};
