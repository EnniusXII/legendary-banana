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

export const sendTransaction = async (recipient, amount) => {
  const transactionData = {recipient, amount};
  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("You need to log in to send a transaction.");
    return Promise.reject("No token available");
  }

  try {
    const response = await axios.post(
      "http://localhost:5001/api/v1/wallet/transaction",
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

export const mineBlock = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("You need to log in to mine a block.");
  }

  try {
    const response = await axios.get(
      "http://localhost:5001/api/v1/wallet/mine",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error mining block:", error);
  }
};