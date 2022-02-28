const KEY = '24835588-34c67f39a9342d1bd89adf1b2';

const fetchImages = (name, page) => {
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

const api = {
  fetchImages,
};

export default api;
