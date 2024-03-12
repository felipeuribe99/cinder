import axios from 'axios';

const findAllOrganizations = async (token: string | undefined) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/organizations`, 
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

export default findAllOrganizations;
