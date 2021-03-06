import Backdrop from '@/components/backdrop/backdrop';
import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import { isRenderable } from '@/utils/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

// @todo 애니메이션 정의
function Confirm({
  cancel: cancelNode = 'Cancel', className, description, heading, onClose, ok: okNode = 'OK', okColor = 'primary', open, ...rest
}) {
  const handleCancelClick = useCallback(() => {
    onClose?.(false);
  }, [onClose]);

  const handleOkClick = useCallback(() => {
    onClose?.(true);
  }, [onClose]);

  return (
    <Modal open={open}>
      <Backdrop />
      <section {...rest} className={classNames('confirm', className)} aria-modal="true" role="alertdialog">
        <h2 className="confirm__heading heading3">{heading}</h2>
        <p className="confirm__description">{description}</p>
        <div className="confirm__button">
          {isRenderable(cancelNode) && <Button className="confirm__button--cancel" color="secondary" onClick={handleCancelClick}>{cancelNode}</Button>}
          {isRenderable(okNode) && <Button className="confirm__button--ok" color={okColor} onClick={handleOkClick}>{okNode}</Button>}
        </div>
      </section>
    </Modal>
  );
}

Confirm.propTypes = {
  cancel: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  heading: PropTypes.node,
  onClose: PropTypes.func,
  ok: PropTypes.node,
  okColor: PropTypes.string,
  open: PropTypes.bool,
};

async function openFn(config) {
  const [confirmed] = await Modal.makeFn(Confirm)(config);
  return confirmed;
}

openFn.displayName = 'Confirm.open';

export default Object.assign(Confirm, { open: openFn });
