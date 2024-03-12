import axios from 'axios';

const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/auth/login`, 
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default signin;
