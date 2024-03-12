import axios from 'axios';

const addUserToRoom = async (
  token: string | undefined, 
  userId: string | undefined, 
  organizationId: string,
  roomIds: string[]
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/users/${userId}`,
      {
        organizationId,
        roomIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default addUserToRoom;
