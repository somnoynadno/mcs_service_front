import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import {TaskAPI} from "../../../http/api/admin/TaskAPI";
import {SubjectAPI} from "../../../http/api/admin/SubjectAPI";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import {SectionAPI} from "../../../http/api/admin/SectionAPI";
import {quillToolbarOptions} from "../../../helpers";
import {TaskTypeAPI} from "../../../http/api/admin/TaskTypeAPI";
import {DeleteDialog} from "../../dialogs/DeleteDialog";

export const EditTaskForm = (props) => {
    const classes = useStyles;

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [solution, setSolution] = useState('');
    let [author, setAuthor] = useState('');
    let [difficulty, setDifficulty] = useState(
        props.location.state !== undefined ?
            props.location.state.task.difficulty : 5);
    let [solutionAuthor, setSolutionAuthor] = useState('');

    let [subjectID, setSubjectID] = useState(null);
    let [sectionID, setSectionID] = useState(null);
    let [taskID, setTaskID] = useState(null);
    let [taskTypeID, setTaskTypeID] = useState(null);

    let [subjects, setSubjects] = React.useState([]);
    let [sections, setSections] = React.useState([]);
    let [taskTypes, setTaskTypes] = React.useState([]);

    useEffect(() => {
        async function fetchSubject(id) {
            const api = new SubjectAPI();
            return await api.GetSubject(id);
        }

        async function fetchSection(id) {
            const api = new SectionAPI();
            return await api.GetSection(id);
        }

        async function fetchTask(id) {
            const api = new TaskAPI();
            return await api.GetTask(id);
        }

        async function setSectionsBySubjectID(id) {
            const api = new SectionAPI();
            let response = await api.GetSectionsBySubjectID(id);
            setSections(response);
        }

        let subjectID;
        if (props.location.state === undefined) {
            subjectID = window.location.pathname.split('/')[2];
            let sectionID = window.location.pathname.split('/')[3];
            let taskID = window.location.pathname.split('/')[4];

            fetchSubject(subjectID).then((s) => {
                setSubjectID(s.id);
                fetchSection(sectionID).then((s) => {
                    setSectionID(s.id);
                    fetchTask(taskID).then((t) => {
                        setTaskID(t.id);
                        setName(t.name);
                        setDescription(t.description);
                        setSolution(t.solution);
                        setAuthor(t.author);
                        setDifficulty(t.difficulty);
                        setTaskTypeID(t.task_type_id);
                        setSolutionAuthor(t.solution_author);
                    });
                });
            });
        } else {
            subjectID = props.location.state.subject.id;
            setSubjectID(subjectID);
            setSectionID(props.location.state.section.id);
            setTaskID(props.location.state.task.id);
            setName(props.location.state.task.name);
            setDescription(props.location.state.task.description);
            setSolution(props.location.state.task.solution);
            setAuthor(props.location.state.task.author);
            setDifficulty(props.location.state.task.difficulty);
            setTaskTypeID(props.location.state.task.task_type_id);
            setSolutionAuthor(props.location.state.task.solution_author);
        }

        setSectionsBySubjectID(subjectID);
    }, [props]);

    useEffect(() => {
        async function fetchData() {
            const api = new SubjectAPI();
            let response = await api.GetAllSubjects();
            setSubjects(response);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const api = new TaskTypeAPI();
            let response = await api.GetAllTaskTypes();
            setTaskTypes(response);
        }

        fetchData();
    }, []);

    const updateTask = async (event) => {
        event.preventDefault();
        const api = new TaskAPI();
        await api.UpdateTask(taskID, name, description, solution, author,
            difficulty, sectionID, taskTypeID, solutionAuthor);
        history.push(`/view/${subjectID}/${sectionID}/${taskID}`);
    }

    const deleteTask = async () => {
        const api = new TaskAPI();
        await api.DeleteTask(taskID);
        history.push(`/view/${subjectID}/${sectionID}`);
    }

    const handleSubjectChange = async (event) => {
        setSubjectID(event.target.value);

        const api = new SectionAPI();
        let response = await api.GetSectionsBySubjectID(event.target.value);
        setSections(response);
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Редактирование задачи
            </Typography>
            <form onSubmit={(event => updateTask(event))}>
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
                    <TextField
                        required
                        name="author"
                        label="Автор"
                        id="author"
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
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
                        onChange={(event => handleSubjectChange(event))}
                    >
                        {subjects.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-section-label">Раздел</InputLabel>
                    <Select
                        required
                        labelId="select-section-label"
                        id="select-section"
                        style={{width: 200}}
                        value={sectionID}
                        className={classes.selectEmpty}
                        onChange={(event => setSectionID(event.target.value))}
                    >
                        {sections.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <br /><br />
                <Typography>
                    Сложность
                </Typography>
                <Slider
                    defaultValue={difficulty}
                    aria-labelledby="difficulty-slider"
                    getAriaValueText={setDifficulty}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    style={{maxWidth: 400}}
                />
                <br /><br />
                <Typography>
                    Описание
                </Typography>
                <ReactQuill theme="snow" modules={quillToolbarOptions} style={{maxWidth: "740px"}}
                            value={description} onChange={setDescription}/>
                <br />
                <Typography>
                    Решение
                </Typography>
                <ReactQuill theme="snow" modules={quillToolbarOptions} style={{maxWidth: "740px"}}
                            value={solution} onChange={setSolution}/>
                <FormControl className={classes.formControl} >
                    <TextField
                        name="solutionAuthor"
                        label="Автор решения"
                        id="solutionAuthor"
                        value={solutionAuthor}
                        onChange={event => setSolutionAuthor(event.target.value)}
                        style={{maxWidth: 400}}
                    />
                </FormControl>
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-task-type-label">Tag</InputLabel>
                    <Select
                        required
                        labelId="select-task-type-label"
                        id="select-task-type"
                        style={{width: 200}}
                        value={taskTypeID}
                        className={classes.selectEmpty}
                        onChange={event => setTaskTypeID(event.target.value)}
                    >
                        {taskTypes.map((s, i) => {
                            return <MenuItem key={i} value={s.id}>{s.name}</MenuItem>
                        })}
                    </Select>
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
                <DeleteDialog deleteCallback={() => deleteTask()} />
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

