import axios from "axios";
const BASE_URL = "http://optivas.ir/";

export async function PostPhoneNumber(phoneNumber) {
  const response = await axios.post(`${BASE_URL}accounts/`, {
    phoneNumber,
  });

  return response;
}

export async function SmsVarificationOtp({ phoneNumber, otp }) {
  const response = await axios.post(`${BASE_URL}accounts/verify/`, {
    phoneNumber,
    otp,
  });

  return response;
}

export async function RegisterUser(id, { fullName, email, phoneNumber }) {
  const response = await axios.patch(`${BASE_URL}/accounts/${id}/`, {
    fullName,
    email,
    phoneNumber,
  });

  return response;
}
