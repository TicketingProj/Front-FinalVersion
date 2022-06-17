import axios from "axios";
const BASE_URL = "http://optivas.ir/";

export async function PostPhoneNumber(phoneNumber) {
  const response = await axios.post(`${BASE_URL}accounts/`, {
    phoneNumber,
  });

  return response;
}

export async function GetSingleUser(id, token) {
  const response = await axios.get(`${BASE_URL}/accounts/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
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

export async function RegisterUser({
  avatar,
  id,
  fullName,
  email,
  phoneNumber,
  token,
}) {
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);

  if (avatar === "empty") {
    formData.append("avatar", "");
  } else if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await axios.patch(`${BASE_URL}/accounts/${id}/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response;
}

export async function DeleteAccount(id, token) {
  const response = await axios.delete(`${BASE_URL}/accounts/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response;
}
