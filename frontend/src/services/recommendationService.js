export const recommendHotels = (hotels, user) => {
  return hotels.sort((a, b) => {
    // Example logic
    return a.price_per_night - b.price_per_night;
  });
};