import axios from "axios";

export const logout = async() => {
  try {
    const response = await axios.post(
      `http://localhost:3000/auth/logout`, 
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};