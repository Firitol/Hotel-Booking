import { sendSMS } from "../services/smsService.js";

export const createBooking = async (req, res) => {
  const booking = await createBookingDB(...);

  await sendSMS(
    req.user.phone,
    `Your booking is confirmed. Booking ID: ${booking.rows[0].id}`
  );

  res.json(booking.rows[0]);
};