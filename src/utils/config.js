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
};
