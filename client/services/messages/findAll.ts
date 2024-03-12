import axios from 'axios';

const findAllMessages = async (token: string | undefined, roomId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/messages/rooms/${roomId}`,
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

export default findAllMessages;
