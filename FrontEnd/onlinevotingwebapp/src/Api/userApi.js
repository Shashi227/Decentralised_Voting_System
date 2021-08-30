import axiosInstance from './Index'



const userApi = {
    login:(data) => axiosInstance({
        method: 'post',
        url: '/api/login',
        data: data
      }),
      register:(data) => axiosInstance({
        method: 'post',
        url: '/api/register',
        data: data
      }),
    }

export default userApi;