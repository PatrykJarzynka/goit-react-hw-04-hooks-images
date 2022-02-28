import { Component } from 'react';
import imageAPI from '../services/pixabay';
import ImageGalleryItem from './ImageGalleryItem.js';
import Button from './Button';
import { nanoid } from 'nanoid';
import Loader from './Loader';
import styled from '@emotion/styled';
import Modal from './Modal.js';
import PropTypes from 'prop-types';

let page = 1;

const FancyGallery = styled.ul({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '0px 20px',
  rowGap: '20px',
  columnGap: '20px',
  listStyle: 'none',
  justifyContent: 'center',
});

const FancyLoader = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

class ImageGallery extends Component {
  state = {
    current: 'idle',
    data: [],
    isModalShow: false,
    bigUrl: '',
  };

  apiState = {
    pending: () => this.setState({ current: 'pending' }),
    succes: () => this.setState({ current: 'succes' }),
    error: () => this.setState({ current: 'error' }),
    idle: () => this.setState({ current: 'idle' }),
    isPending: () => this.state.current === 'pending',
    isSucces: () => this.state.current === 'succes',
    isError: () => this.state.current === 'error',
    isIdle: () => this.state.current === 'idle',
  };

  async componentDidUpdate(prevProps) {
    const prevName = prevProps.name;
    const nextName = this.props.name;

    if (prevName !== nextName) {
      try {
        this.apiState.pending();
        let data = await imageAPI.fetchImages(nextName, page);
        this.setState({ data: data.hits });
        this.apiState.succes();
      } catch (error) {
        this.apiState.error();
      }
    }
  }

  handleClick = async (e, name) => {
    e.preventDefault();
    page++;
    try {
      this.apiState.pending();
      let newData = await imageAPI.fetchImages(name, page);
      this.setState(({ data }) => ({ data: [...data, ...newData.hits] }));
      this.apiState.succes();
    } catch (error) {
      this.apiState.error();
    }
  };

  showBigPicture = bigImg => {
    this.setState({ isModalShow: true, bigUrl: bigImg });
  };

  hideBigPicture = () => {
    this.setState({ isModalShow: false });
  };

  closeOnEsc = event => {
    if (event.keyCode === 27) {
      this.setState({ isModalShow: false });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  render() {
    let items = this.state.data;
    let pictures = [];
    if (items) {
      pictures = items.map(item => (
        <ImageGalleryItem
          key={nanoid()}
          url={item.webformatURL}
          bigImg={item.largeImageURL}
          showBigPicture={this.showBigPicture}
        />
      ));
    }

    return (
      <div>
        {this.apiState.isPending() && (
          <FancyLoader>
            <FancyGallery className="gallery">{pictures}</FancyGallery>
            <Loader />
          </FancyLoader>
        )}
        {this.state.isModalShow === true && (
          <div>
            <Modal url={this.state.bigUrl} onClick={this.hideBigPicture} />
            <FancyGallery className="gallery">
              {pictures}
              <Button onClick={event => this.handleClick(event, this.props.name)} />
            </FancyGallery>
          </div>
        )}
        {this.apiState.isSucces() && this.state.isModalShow === false && (
          <FancyGallery className="gallery">
            {pictures}
            <Button onClick={event => this.handleClick(event, this.props.name)} />
          </FancyGallery>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  name: PropTypes.string,
};

export default ImageGallery;
