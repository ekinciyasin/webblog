// import axios from "axios";
//
// export const signup = (body) => {
//     return axios.post("/api/1.0/users", body);
// };
//
// export const login = (creds) => {
//     return axios.post("/api/1.0/auth", {}, { auth: creds });
// };
//
// export const changeLanguage = (language) => {
//     axios.defaults.headers["accept-language"] = language;
// };

import axios from "axios";


export const getUser = (id) => {
 return  axios.get("http://localhost:3005/users/1")
};