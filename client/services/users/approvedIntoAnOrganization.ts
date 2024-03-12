import axios from 'axios';

const approvedIntoAnOrganization = async (
  token: string | undefined, 
  userId: string | undefined, 
  organizationId: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/users/${userId}`,
      {
        isApproved: true,
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
    console.error(error);
    return null;
  }
};

export default approvedIntoAnOrganization;
