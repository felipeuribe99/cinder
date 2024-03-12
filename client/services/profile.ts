import axios from 'axios';
import { cookies } from 'next/headers';

const currentUser = async () => {
  const token = cookies().get('token')?.value;
  try {
    const response = await axios.get<{
    }>(`http://localhost:3000/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export default currentUser;
