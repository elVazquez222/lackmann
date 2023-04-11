// const istLocalEnvironment = window.location.hostname = 'localhost';
// export const API_URL = istLocalEnvironment
//   ? 'http://localhost:5000'
//   : import.meta.env.VITE_API_URL ?? 'https://api.vazquez.website';

export const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.vazquez.website';