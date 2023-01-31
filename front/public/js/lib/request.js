const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    // baseURL: "http://54.180.163.189:80",
    withCredentials: true,
  });
  
  
  export default request