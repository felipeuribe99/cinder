import axios from 'axios';

const createRoom = async (
  token: string | undefined, 
  name: string, 
  organizationId: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/commons/create-room`, 
      {
        name,
        organizationId,
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

export default createRoom;
