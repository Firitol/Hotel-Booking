const API = process.env.NEXT_PUBLIC_API;

export const getHotels = async (city_id = "") => {
  try {
    const res = await fetch(`${API}/api/hotels?city_id=${city_id}`);
    if (!res.ok) throw new Error("Failed to fetch hotels");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
