import React from "react";
import history from "../../../history";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {SubjectAPI} from "../../../http/api/admin/SubjectAPI";
import FormControl from "@material-ui/core/FormControl";


export const CreateSubjectForm = () => {
    let [name, setName] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [teachers, setTeachers] = React.useState('');

    const createSubject = async (event) => {
        event.preventDefault();
        const api = new SubjectAPI();
        let r = await api.CreateSubject(name, description, teachers);
        history.push(`/view/${r.id}`);
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Новый предмет
            </Typography>
            <form onSubmit={(event => createSubject(event))}>
                <FormControl fullWidth style={{maxWidth: 500}}>
                    <TextField
                        required
                        id="name"
                        label="Название"
                        name="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <br />
                    <TextField
                        required
                        name="description"
                        label="Описание"
                        multiline
                        rowsMax={6}
                        id="description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <br />
                    <TextField
                        required
                        name="teachers"
                        label="Преподаватели"
                        multiline
                        rowsMax={3}
                        id="teachers"
                        value={teachers}
                        onChange={event => setTeachers(event.target.value)}
                    />
                </FormControl>
                <br />
                <Button
                    style={{marginTop: 30}}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Создать
                </Button>
            </form>
        </div>
    )
}
