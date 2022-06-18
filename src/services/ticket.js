import axios from "axios";

const endPoint = "http://optivas.ir/";

export async function PostTicket(
  { title, body, id, parent, pariority, section, status },
  token
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user", id);
  formData.append("parent", parent);
  formData.append("pariority", pariority);
  formData.append("section", section);
  formData.append("status", status);

  console.log("token : ", token);

  const response = await axios.post(`${endPoint}/tickets/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response;
}
