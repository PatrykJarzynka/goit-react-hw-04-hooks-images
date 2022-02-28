import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const FancyModal = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,

  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  width: '100%',
  height: '100%',
});

function Modal({ url, onClick }) {
  return (
    <Overlay className="overlay" onClick={onClick}>
      <FancyModal className="modal">
        <img src={url} alt="bigPicture" onClick={event => event.stopPropagation()} />
      </FancyModal>
    </Overlay>
  );
}

Modal.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;
