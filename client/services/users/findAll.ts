import axios from 'axios';

const findAllUsers = async (organizationId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users/organization/${organizationId}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default findAllUsers;
