import axios from 'axios';

const findAllUsers = async (token: string | undefined, organizationId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users/organization/${organizationId}`,
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

export default findAllUsers;
