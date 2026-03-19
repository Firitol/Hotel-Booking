const API = "http://localhost:5000";

export const getHotels = async () => {
  const res = await fetch(API + "/api/hotels");
  return res.json();
};