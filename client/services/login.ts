import axios from 'axios';
import { User } from '../app/utils/interfaces';

const signin = async (email: string, password: string) => {
  let accessToken: User | null = null;
  try {
    const response = await axios.post<{
      accessToken: User | null;
    }>(
      `http://localhost:3000/auth/login`, 
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    accessToken = response.data.accessToken;
    return accessToken;
  } catch (error) {
    return null;
  }
};

export default signin;
