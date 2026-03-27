import axios from 'axios'

export const axiosAPI = axios.create({
    baseURL: process.env.URL || 'http://localhost:3000',
    timeout: 100000,
    headers: { 'Content-Type': 'application/json' }
})

axiosAPI.interceptors.request.use((request) => {
    console.log(`AXIOS : ${request.method?.toUpperCase()} ${request.url}`)

    if (request.data) {
        console.log('PAYLOAD : ', request.data)
    }
    return request;
},

    (error) => {
        console.error('❌ [REQUEST ERROR]', error);
        return Promise.reject(error);
    }
);



axiosAPI.interceptors.response.use((response) => {
  console.log(`AXIOS : [RECEIVED] ${response.status} from ${response.config.url}`);
  
  // Log the actual data returned by the server
  console.log('Data:', response.data);
  
  return response;
}, (error) => {
  // This catches 400, 401, 500 errors etc.
  console.error(`[RESPONSE ERROR] ${error.response?.status || 'Network Error'}`);
  console.error('Message:', error.message);
  
  return Promise.reject(error);
});
