import axios from "axios";


const apiUrl = import.meta.env.VITE_URL ;

const request = async ({ method, route, body, headers = {} }) => {
  try {
    
    const token = localStorage.getItem("access_token");

    const defaultHeaders = {
      "Content-Type": "application/json",
          "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),

      ...headers,
    };

    const response = await axios.request({
      method,
      url: apiUrl+route,
      data: body,
      headers: defaultHeaders,
    });
    console.log(response)
    return {
      success:response.data.success,
      message:response.data.message,
      data:response.data.data
    }
  } catch (error) {
    
    return {
      success:false,
      message:error.response?.data?.message || "An error occurred"

    }
  }
};


export default request

