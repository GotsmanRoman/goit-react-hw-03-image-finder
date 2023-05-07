import axios from 'axios';

export const fetchAPI = async (query, page, perPage) => {
  try {
    const response = await axios.get('https://pixabay.com/api/?', {
      params: {
        key: '33277112-6a7c7acf3741d1ff176c90aa7',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response;
  } catch {
    console.log('error');
  }
};
