export const baseURL = "http://localhost:8000";
export const fastURL = "http://localhost:8080";

export const endpoints = {
  registerUser: `${baseURL}/users/register/`,
  login: `${baseURL}/users/login/`,
  logout: `${baseURL}/users/logout/`,
  registerDoctor: `${baseURL}/doctor/`,
  records: `${baseURL}/api/record/`,
  fastAPI: `${fastURL}/predict`,
  recordAfterInference: `${baseURL}/api/record-after-inference/`,
  patients: `${baseURL}/api/patient/`,
  diseases: `${baseURL}/api/disease/`,
  doctor: `${baseURL}/api/doctor/`,

  englishChatBot: `https://bbf1-2409-40c2-3005-7ee4-2910-cdef-b3e9-11ca.ngrok-free.app`,
  hindiChatBot: `https://7609-2401-4900-529d-17cc-ac98-8c4b-72e0-f32a.ngrok-free.app/`,
};
