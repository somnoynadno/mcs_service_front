import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
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
import {SectionAPI} from "../../../http/api/admin/SectionAPI";
import {quillToolbarOptions} from "../../../helpers";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {MaterialAPI} from "../../../http/api/admin/MaterialAPI";

export const CreateMaterialForm = () => {
    const classes = useStyles;

    let [name, setName] = useState('');
    let [content, setContent] = useState('');
    let [isVisible, setIsVisible] = useState(true);
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
        const api = new MaterialAPI();
        let r = await api.CreateMaterial(name, content, isVisible, sectionID);
        history.push(`/material/${r.id}`);
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
                Новый материал для подготовки
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
                    Содержание
                </Typography>
                <ReactQuill theme="snow" modules={quillToolbarOptions} style={{maxWidth: "740px"}}
                            value={content} onChange={setContent}/>
                <br />
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

