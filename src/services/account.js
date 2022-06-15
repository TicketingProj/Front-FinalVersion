import axios from "axios";
const BASE_URL = "http://optivas.ir/";

export async function PostPhoneNumber(phoneNumber) {
  const response = await axios.post(`${BASE_URL}accounts/`, {
    phoneNumber,
  });

  return response;
}

export async function GetSingleUser(id) {
  const response = await axios.get(`${BASE_URL}account/${id}`);
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
  const data = {
    fullName,
    email,
    phoneNumber,
  };

  if (avatar) {
    console.log("come here");
    data.avatar = avatar;
  }

  const response = await axios.patch(
    `${BASE_URL}/accounts/${id}/`,
    { ...data },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response;
}
