import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const FancyButton = styled.button({
  backgroundColor: '#3f51b5',
  color: 'white',
  border: 'none',
  padding: 10,
  borderRadius: 5,
  cursor: 'pointer',
});

function Button({ onClick }) {
  return (
    <FancyButton type="button" onClick={onClick}>
      Load More
    </FancyButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
