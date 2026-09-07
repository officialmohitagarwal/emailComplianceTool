import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;


export const analyzeEmail = async (data) => {

  try {

    const response = await axios.post(
      `${API_URL}/api/analyze`,
      data
    );


    return response.data;

  } catch (error) {

    throw new Error(
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Something went wrong while analyzing the email."
    );

  }

};