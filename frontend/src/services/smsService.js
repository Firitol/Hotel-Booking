import axios from "axios";

export const sendSMS = async (phone, message) => {
  try {
    await axios.post("https://api.africastalking.com/version1/messaging", {
      to: phone,
      message
    }, {
      headers: {
        apiKey: process.env.SMS_API_KEY
      }
    });
  } catch (err) {
    console.log("SMS error:", err.message);
  }
};