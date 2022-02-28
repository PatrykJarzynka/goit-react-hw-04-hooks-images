import { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const FancyItem = styled.li({
  width: '450px',
});

const FancyImg = styled.img({
  display: 'block',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
});

class ImageGalleryItem extends Component {
  state = {
    isClicked: false,
  };

  handleClick = () => {
    this.props.showBigPicture(this.props.bigImg);
  };

  render() {
    return (
      <FancyItem className="gallery-item" onClick={this.handleClick}>
        <FancyImg src={this.props.url} alt="picture" />
      </FancyItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  bigImg: PropTypes.string,
  showBigPicture: PropTypes.func,
};

export default ImageGalleryItem;
