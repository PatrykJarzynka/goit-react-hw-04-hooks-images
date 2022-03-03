import { Component, useCallback, useEffect, useState } from 'react';
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

function ImageGallery(props) {
  const [current, setApiState] = useState('idle');
  const [data, setData] = useState([]);
  const [isModalShow, setModal] = useState(false);
  const [bigUrl, setBigUrl] = useState('');

  const apiState = {
    pending: () => setApiState('pending'),
    succes: () => setApiState('succes'),
    error: () => setApiState('error'),
    idle: () => setApiState('idle'),
    isPending: () => current === 'pending',
    isSucces: () => current === 'succes',
    isError: () => current === 'error',
    isIdle: () => current === 'idle',
  };

  useEffect(() => {
    if (!props.name) return

    async function fetchImages() {
      try {
        apiState.pending();
        let fetchedData = await imageAPI.fetchImages(props.name, page);
        setData(fetchedData.hits);
        apiState.succes();
      } catch (error) {
        apiState.error();
      }
    }

    fetchImages();
  }, [props.name]);

  const handleClick = async (e, name) => {
    e.preventDefault();
    page++;
    try {
      apiState.pending();
      let newData = await imageAPI.fetchImages(props.name, page);
      setData([...data, ...newData.hits]);
      apiState.succes();
    } catch (error) {
      apiState.error();
    }
  };

  const showBigPicture = bigImg => {
    setBigUrl(bigImg);
    setModal(true);
  };

  const hideBigPicture = () => {
    setModal(false);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        hideBigPicture();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  let items = data;
  let pictures = [];
  if (items) {
    pictures = items.map(item => (
      <ImageGalleryItem
        key={nanoid()}
        url={item.webformatURL}
        bigImg={item.largeImageURL}
        showBigPicture={showBigPicture}
      />
    ));
  }

  return (
    <div>
      {apiState.isPending() && (
        <FancyLoader>
          <FancyGallery className="gallery">{pictures}</FancyGallery>
          <Loader />
        </FancyLoader>
      )}
      {isModalShow === true && (
        <div>
          <Modal url={bigUrl} onClick={hideBigPicture} />
          <FancyGallery className="gallery">
            {pictures}
            <Button onClick={event => handleClick(event, props.name)} />
          </FancyGallery>
        </div>
      )}
      {apiState.isSucces() && isModalShow === false && (
        <FancyGallery className="gallery">
          {pictures}
          <Button onClick={event => handleClick(event, props.name)} />
        </FancyGallery>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  name: PropTypes.string,
};

export default ImageGallery;
