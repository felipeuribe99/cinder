import axios from 'axios';

const makeAdminOfAnOrganization = async (
  token: string | undefined, 
  userId: string | undefined, 
  organizationId: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/users/${userId}`,
      {
        admin: true,
        organizationId
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

export default makeAdminOfAnOrganization;
