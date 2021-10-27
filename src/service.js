import axios from 'axios';

export const api = async () => {
  const response = await axios(
    'https://scs-interview-api.herokuapp.com/questions',
  );

  if (!response.status) {
    throw new Error('api error');
  }

  return response ?? null;
};
