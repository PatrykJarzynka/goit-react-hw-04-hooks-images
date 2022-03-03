import './App.css';
import {useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import styled from '@emotion/styled';

const FancyApp = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px',
});

function App(props) {
  const [name, setName] = useState('');

  const handleFormSubmit = name => {
    setName(name);
  };

  return (
    <FancyApp>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery name={name} />
    </FancyApp>
  );
}

export default App;
