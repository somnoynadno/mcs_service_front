import React from 'react';
import history from "../history";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {AuthAPI} from "../http/api/AuthAPI";

/*
 Простая страница авторизации.
 */
export const LoginPage = () => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [errorText, setErrorText] = React.useState('');

    let API = new AuthAPI();
    localStorage.removeItem("token");

    const login = async () => {
        if (username && password) {
            await API.LoginUser(username, password)
                .then((resp) => {
                    if (resp.constructor !== Error) {
                        localStorage.setItem('token', resp["token"]);
                        history.push('/');
                        window.location.reload();
                    } else {
                        setErrorText(resp.response.data.message);
                    }
                });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{marginTop: 30}}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onClick={event => {event.preventDefault()}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <span style={{color: "red"}}>{errorText}</span>
                    <Button
                        style={{marginTop: 30}}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={login}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
