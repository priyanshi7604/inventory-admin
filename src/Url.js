// // const Url = "http://localhost:5500/api";

// // let token = localStorage.getItem("token");

// // const headers = {
// //     "ngrok-skip-browser-warning": true,
// //     "Content-Type": "application/json;charset=UTF-8",
// //     "Access-Control-Allow-Origin": "*",
// //     token: token,
// // };

// // const config = {
// //     headers: headers,
// // };
// // export { Url, config };

// // src/Url.js (ya jahan bhi file hai)

// const Url = "http://localhost:3000/api";

// let token = localStorage.getItem("token");

// const headers = {
//     "ngrok-skip-browser-warning": true,
//     "Content-Type": "application/json;charset=UTF-8",
//     "Access-Control-Allow-Origin": "*",
//     token: token ? token : "",
// };

// const config = {
//     headers: headers,
// };

// export { Url, config };

// src/Url.js

// Automatically switch between local and production backend
// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:3000/api" // Local backend during development
//     : "https://inventory-backend-6fxk.onrender.com/api"; // Live backend on Render

const Url = "https://inventory-backend-6fxk.onrender.com/api";
// Get token from localStorage
let token = localStorage.getItem("token");

// Common headers for all API calls
const headers = {
  "ngrok-skip-browser-warning": true,
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  token: token ? token : "",
};

// Config object for axios
const config = {
  headers: headers,
};

// export { BASE_URL as Url, config };
export { Url, config };
