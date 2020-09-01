import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Button = React.forwardRef(({
  children, className, type = 'button', ...rest
}, ref) => {
  const isAnchor = type === 'anchor';
  const Element = isAnchor ? 'a' : 'button';

  return (
    <Element {...rest} className={classNames('button', className)} type={isAnchor ? undefined : type} ref={ref}>{children}</Element>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default React.memo(Button);
