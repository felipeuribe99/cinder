import axios from 'axios';

const findAll = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/organizations`, 
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default findAll;