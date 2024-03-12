import axios from 'axios';
import { cookies } from 'next/headers';

const currentUser = async () => {
  const token = cookies().get('token')?.value;
  try {
    const response = await axios.get(
      `http://localhost:3000/auth/profile`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      const user = await axios.get(
        `http://localhost:3000/users/${response.data.sub}`, 
      );
      if (user.data) {
        return user.data;
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    return null;
  }
};

export default currentUser;
