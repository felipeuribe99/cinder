import axios from 'axios';

const create = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/users`, 
      {
        name,
        email,
        password,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default create;
