import React, {useEffect} from "react";
import history from "../../../history";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {SubjectAPI} from "../../../http/api/admin/SubjectAPI";
import FormControl from "@material-ui/core/FormControl";
import {DeleteDialog} from "../../dialogs/DeleteDialog";


export const EditSubjectForm = (props) => {
    let [subjectID, setSubjectID] = React.useState(null);
    let [name, setName] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [teachers, setTeachers] = React.useState('');

    useEffect(() => {
        async function fetchSubject(id) {
            const api = new SubjectAPI();
            return await api.GetSubject(id);
        }

        if (props.location.state === undefined) {
            let subjectID = window.location.pathname.split('/')[2];

            fetchSubject(subjectID).then((s) => {
                setSubjectID(s.id);
                setName(s.name);
                setDescription(s.description);
                setTeachers(s.teachers);
            });
        } else {
            setSubjectID(props.location.state.subject.id);
            setName(props.location.state.subject.name);
            setDescription(props.location.state.subject.description);
            setTeachers(props.location.state.subject.teachers);
        }
    }, [props]);

    const updateSubject = async (event) => {
        event.preventDefault();
        const api = new SubjectAPI();
        await api.UpdateSubject(subjectID, name, description, teachers);
        history.push(`/view/${subjectID}`);
    }

    const deleteSubject = async () => {
        const api = new SubjectAPI();
        await api.DeleteSubject(subjectID);
        history.push('/view');
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Редактирование предмета
            </Typography>
            <form onSubmit={(event => updateSubject(event))}>
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
                    Сохранить
                </Button>
                <br /><br />
                <DeleteDialog deleteCallback={() => deleteSubject()} />
            </form>
        </div>
    )
}
