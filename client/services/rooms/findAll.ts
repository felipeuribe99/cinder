import axios from 'axios';

const findAllRooms = async (token: string | undefined, organizationId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/rooms/organization/${organizationId}`,
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

export default findAllRooms;
