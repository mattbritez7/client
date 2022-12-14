import axios from "axios";

const GET_DATA = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get("http://localhost:4000/users/me", config);
  const data = res.data;
  console.log(data)
  return data;
};

export default GET_DATA;
