import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/v1/auth/login",
      { email, password },
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const getBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/v1/wallet/balance"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
};