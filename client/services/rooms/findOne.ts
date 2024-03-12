import axios from 'axios';

const findOne = async (token: string | undefined, id: string) => {
  console.log('id', id);
  try {
    const response = await axios.get(
      `http://localhost:3000/rooms/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default findOne;
