import axios from "axios";

const endPoint = "http://optivas.ir/";

export async function PostTicket(
  { title, body, id, pariority, section, status, parent },
  token
) {
  const formData = new FormData();
  if (parent) formData.append("parent", parent);
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

export async function EditTicket(
  { title, body, id, pariority, section, status, parent, ticketId },
  token
) {
  const formData = new FormData();
  if (parent) formData.append("parent", parent);
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user", id);
  formData.append("pariority", pariority);
  formData.append("section", section);
  formData.append("status", status);

  const response = await axios.patch(
    `${endPoint}/tickets/${ticketId}/`,
    formData,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response;
}

export async function GetTicketsList(token, filter) {
  let _filter = "";

  if (filter !== undefined) {
    _filter = filter;
  }

  const response = await axios.get(`${endPoint}/tickets/${_filter}`, {
    headers: {
      Authorization: `Token ${token}`,
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

export async function GetAllTicket(token, filter) {
  let _filter = "";

  if (filter !== undefined) {
    _filter = filter;
  }

  const response = await axios.get(`${endPoint}/all/${_filter}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}

export async function GetMyTicket(token, filter) {
  let _filter = "";

  if (filter !== undefined) {
    _filter = filter;
  }

  const response = await axios.get(`${endPoint}/my_tickets/${_filter}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}

export async function DeleteTicket(token, id) {
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

export async function GetChildTikcet(token, id) {
  const response = await axios.get(`${endPoint}/tickets/${id}/child_ticket/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}
