import axios from 'axios'
import {apiAddress} from "../../config";

export class AuthAPI {
    LoginUser(username, password) {
        return new Promise((resolve) => {
            axios.post(apiAddress + `/auth/login`, {
                username: username,
                password: password
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error);
                resolve(error);
            });
        })
    }
}
