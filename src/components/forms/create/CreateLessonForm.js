import React, {useEffect, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import {SubjectAPI} from "../../../http/api/admin/SubjectAPI";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {LessonTypeAPI} from "../../../http/api/admin/LessonTypeAPI";
import {LessonAPI} from "../../../http/api/admin/LessonAPI";

import DateUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

export const CreateLessonForm = () => {
    const classes = useStyles;

    let [name, setName] = useState('');
    let [additionalInfo, setAdditionalInfo] = useState('');
    let [password, setPassword] = useState('');
    let [fromDate, setFromDate] = useState(null);
    let [dueDate, setDueDate] = useState(null);
    let [isVisible, setIsVisible] = useState(true);
    let [subjectID, setSubjectID] = useState(null);
    let [lessonTypeID, setLessonTypeID] = useState(null);

    let [subjects, setSubjects] = React.useState([]);
    let [lessonTypes, setLessonTypes] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const subjectAPI = new SubjectAPI();
            let s = await subjectAPI.GetAllSubjects();
            setSubjects(s);

            const lessonTypeAPI = new LessonTypeAPI();
            let lt = await lessonTypeAPI.GetAllLessonTypes();
            setLessonTypes(lt)
        }

        fetchData();
    }, []);

    const createLesson = async (event) => {
        event.preventDefault();

        const api = new LessonAPI();
        let r = await api.CreateLesson(name, additionalInfo, password,
            fromDate, dueDate, isVisible, lessonTypeID, subjectID);

        history.push({pathname: `/lesson/${r.id}/add_tasks`, state: {lesson: r}});
    }

    const handleFromDateChange = (date) => {
        console.log("From: " + date.toString());
        setFromDate(date);
    };

    const handleDueDateChange = (date) => {
        console.log("Due: " + date.toString());
        setDueDate(date);
    };

    return (
        <div>
            <Typography component="h1" variant="h5">
                Новое занятие
            </Typography>
            <form onSubmit={(event => createLesson(event))}>
                <FormControl className={classes.formControl}>
                    <br />
                    <TextField
                        required
                        id="name"
                        label="Название"
                        name="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        style={{maxWidth: 400}}
                    />
                </FormControl>
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-subject-label">Предмет</InputLabel>
                    <Select
                        required
                        labelId="select-subject-label"
                        id="select-subject"
                        style={{width: 200}}
                        value={subjectID}
                        className={classes.selectEmpty}
                        onChange={(event => setSubjectID(event.target.value))}
                    >
                        {subjects.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-lesson-type-label">Тип</InputLabel>
                    <Select
                        required
                        labelId="select-lesson-type-label"
                        id="select-lesson-type"
                        style={{width: 200}}
                        value={lessonTypeID}
                        className={classes.selectEmpty}
                        onChange={(event => setLessonTypeID(event.target.value))}
                    >
                        {lessonTypes.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <br /><br /><br />
                <MuiPickersUtilsProvider utils={DateUtils} locale={"ru"}>
                    <DateTimePicker
                        variant="inline"
                        label="Начало"
                        value={fromDate}
                        onChange={handleFromDateChange}
                    />
                </MuiPickersUtilsProvider>
                <br />
                <MuiPickersUtilsProvider utils={DateUtils} locale={"ru"}>
                    <DateTimePicker
                        variant="inline"
                        label="Дедлайн"
                        value={dueDate}
                        onChange={handleDueDateChange}
                    />
                </MuiPickersUtilsProvider>
                <br /><br />
                <FormControl className={classes.formControl}>
                    <br />
                    <TextField
                        multiline
                        id="additional-info"
                        label="Заметки"
                        name="additional_info"
                        value={additionalInfo}
                        onChange={event => setAdditionalInfo(event.target.value)}
                        style={{maxWidth: 620}}
                    />
                </FormControl>
                <br />
                <FormControl className={classes.formControl}>
                    <br />
                    <TextField
                        required
                        id="password"
                        label="Секретное слово"
                        name="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        style={{maxWidth: 400}}
                    />
                </FormControl>
                <br /><br />
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isVisible} onChange={() => setIsVisible(!isVisible)} />}
                        label="Видимый"
                    />
                </FormGroup>
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
    );
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

