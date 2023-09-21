const url = `baseUrl`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
};
const body = {
  username: username,
  password: password,
};
const requestOptions = {
  method: "GET",
  headers: headers,
  body: JSON.stringify(body),
};
const response = await fetch(url, requestOptions);

// For GET, no body
// For formData no headers or JSON.stringify
