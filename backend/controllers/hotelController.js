import { getHotelsByCity } from "../models/hotelModel.js";

export const fetchHotels = async (req, res) => {
  const { city_id } = req.query;

  try {
    const result = await getHotelsByCity(city_id);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};