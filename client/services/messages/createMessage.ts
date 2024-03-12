import axios from 'axios';

const createMessage = async (
  token: string | undefined, 
  text: string, 
  roomId: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/messages`, 
      {
        text,
        roomId,
      },
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true 
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default createMessage;
