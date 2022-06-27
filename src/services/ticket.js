import axios from "axios";

const endPoint = "http://optivas.ir/";

export async function PostTicket(
  { title, body, id, pariority, section, status },
  token
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user", id);
  formData.append("pariority", pariority);
  formData.append("section", section);
  formData.append("status", status);

  const response = await axios.post(`${endPoint}/tickets/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}

export async function GetTicketsList(token) {
  const response = await axios.get(`${endPoint}/tickets/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
}

export async function GetSingleTickets(token, id) {
  const response = await axios.get(`${endPoint}/tickets/${id}/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
}

export async function DeleteTicket(token, id) {
  console.log("toen : ", token);
  const response = await axios.delete(`${endPoint}/tickets/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}

export async function AddFileToTicket({ token, id, file }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ticket", id);
  const response = await axios.post(`${endPoint}/files/`, formData, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
}

export async function GetSingleFile({ token, id }) {
  const response = await axios.get(`${endPoint}/files/${id}/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
}
