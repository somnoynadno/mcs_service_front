import React, {useEffect} from "react";
import history from "../../../history";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {SubjectAPI} from "../../../http/api/admin/SubjectAPI";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import {SectionAPI} from "../../../http/api/admin/SectionAPI";


export const CreateSectionForm = () => {
    const classes = useStyles();

    let [name, setName] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [subjectID, setSubjectID] = React.useState(null);
    let [subjects, setSubjects] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const api = new SubjectAPI();
            let response = await api.GetAllSubjects();
            setSubjects(response);
        }

        fetchData();
    }, []);

    const createSection = async (event) => {
        event.preventDefault();
        const api = new SectionAPI();
        let r = await api.CreateSection(name, description, subjectID);
        history.push(`/view/${subjectID}/${r.id}`);
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Новый раздел
            </Typography>
            <form onSubmit={(event => createSection(event))}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-subject-label">Предмет</InputLabel>
                    <Select
                        required
                        labelId="select-subject-label"
                        id="select-subject"
                        value={subjectID}
                        autoWidth
                        displayEmpty
                        className={classes.selectEmpty}
                        onChange={(event => setSubjectID(event.target.value))}
                    >
                        {subjects.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <br />
                <FormControl fullWidth style={{maxWidth: 450}}>
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
                    rowsMax={4}
                    id="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
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

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
