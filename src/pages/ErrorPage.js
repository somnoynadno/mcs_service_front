import React from 'react';
import history from "../history";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

/*
 Страница, на которую летят все ошибки API.
 */
export const ErrorPage = (props) => {
    if (props.location.state === undefined) {
        history.push('/view');
        return '';
    }

    const status = props.location.state.status;
    // const message = props.location.state.message;

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div style={{marginTop: 30}}>
                <Typography component="h1" variant="h5">
                    HTTP {status} Error
                    <br />
                    {errors[status].text}
                </Typography>
                <br />
                <Typography>
                    {errors[status].description}
                </Typography>
                <br />
                <Divider />
                <br />
                <Typography>
                    Очень вероятно, что ошибка на моей стороне.
                    <br />
                    Свяжитесь со мной в телеге: @somnoynadno
                </Typography>
            </div>
        </Container>
    );
}

const errors = {
    "400": {
        text: "Некорректный запрос",
        description: "К сожалению, сервер не смог обработать ваш запрос."
    },
    "403": {
        text: "Доступ запрещён",
        description: "У вас недостаточно прав для этого действия."
    },
    "404": {
        text: "Элемент не найден",
        description: "Вы попытались обратиться к несуществующему элементу."
    },
    "405": {
        text: "Метод не поддерживается",
        description: "Метод вашего запроса не поддерживается сервером."
    },
    "408": {
        text: "Время ожидания истекло",
        description: "Превышено время ожидания запроса."
    },
    "500": {
        text: "Ошибка сервера",
        description: "Произошла страшная внутренняя ошибка сервера."
    },
    "503": {
        text: "Сервис недоступен",
        description: "Сервис временно недоступен."
    },
    "504": {
        text: "Сервер не отвечает",
        description: "Превышено время ожидания отввета сервера."
    },
}
