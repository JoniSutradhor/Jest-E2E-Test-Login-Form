import axios from "axios";

class AuthService {
    login = (params)=> {
        return new Promise((resolve, reject) => {
            const URL = `${process.env.REACT_APP_BASE_URL}/login`;
            const data = {
                email: params?.email,
                password: params?.password,
            };
            return axios
                .post(URL, data)
                .then((response) => {
                    if (response?.data?.status_code === 200) resolve(response.data);
                    else reject("somethingWentWrong");
                })
                .catch((e) => {
                    reject(e?.response?.data?.message)
                });
        });
    }
}

const instance = new AuthService()
export default instance;