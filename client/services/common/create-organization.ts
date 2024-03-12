import axios from 'axios';

const createOrganization = async (token: string | undefined, name: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/commons/create-organization`, 
      {
        name
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

export default createOrganization;
