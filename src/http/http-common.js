import axios from 'axios';
import {apiAddress} from '../config';
import history from "../history";

const TIMEOUT = 7000;

/*
 Базовая структура для запросов axios.
 Содержит заголовки запроса, URL и
 функцию обработки ошибок.
 */
export let HTTP = {
    axios: axios.create({
        baseURL: apiAddress,
        timeout: TIMEOUT,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }),
    handleError: function (error) {
        console.log(error);
        if (error.toString() === `Error: timeout of ${TIMEOUT}ms exceeded`) {
            console.log("client timeout");
            history.push({
                pathname: `/error`,
                state: {status: "408", message: 'client timeout'},
            });
        }
        else if (error.response) {
            let message = error.response.data["message"];
            console.log(message); // for developer
            let status = error.response.status;
            if (status === 401) {
                history.push('/login');
            } else {
                history.push({
                    pathname: `/error`,
                    state: {status: status, message: message},
                });
            }
        }
    }
};
