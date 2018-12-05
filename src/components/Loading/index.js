import React from 'react';

import './styles.scss';

export default props => {
  const { on, style, children } = props;
  return (
    <React.Fragment>
      {!on && (
        <div className="Loading" style={style || {}}>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
        </div>
      ) || (
        children
      )}
    </React.Fragment>
  );
}
