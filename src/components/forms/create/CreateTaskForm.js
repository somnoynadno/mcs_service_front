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

export const CreateTaskForm = () => {
    const classes = useStyles;

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [solution, setSolution] = useState('');
    let [solutionAuthor, setSolutionAuthor] = useState('');
    let [author, setAuthor] = useState('');
    let [notes, setNotes] = useState('');
    let [difficulty, setDifficulty] = useState(5);

    let [subjectID, setSubjectID] = useState(null);
    let [sectionID, setSectionID] = useState(null);

    let [subjects, setSubjects] = React.useState([]);
    let [sections, setSections] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const api = new SubjectAPI();
            let response = await api.GetAllSubjects();
            setSubjects(response);
        }

        fetchData();
    }, []);

    const createTask = async (event) => {
        event.preventDefault();
        const api = new TaskAPI();
        let r = await api.CreateTask(name, description, solution,
            author, difficulty, sectionID, solutionAuthor, notes);
        history.push(`/view/${subjectID}/${sectionID}/${r.id}`);
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
                Новая задача
            </Typography>
            <form onSubmit={(event => createTask(event))}>
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
                    <TextField
                        name="notes"
                        label="Примечания"
                        id="notes"
                        value={notes}
                        multiline
                        onChange={event => setNotes(event.target.value)}
                        style={{maxWidth: 400}}
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

