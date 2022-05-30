import useFetch from "./../hooks/useFetch";

export async function PostPhoneNumber(history, phone_number) {
  // "accept: application/json" -H  "Content-Type: application/json" -H
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken":
      "zvFNQ6ah25tXkUiv5mLGBF9jaM8U6KM4Ol2kvRvd26xNrhTlB77CBZe4sRr9eqi9",
  };
  const apiCall = useFetch(history).post(
    "/account",
    {
      phoneNumber: phone_number,
    },
    { headers }
  );
  return apiCall;
}
