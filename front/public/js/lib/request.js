const request = axios.create({
    baseURL: "http://54.180.142.99:80",
    // baseURL: "http://54.180.163.189:80",
    withCredentials: true,
});

export default request;
