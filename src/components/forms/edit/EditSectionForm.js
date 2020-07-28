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
import {SectionTypeAPI} from "../../../http/api/admin/SectionTypeAPI";
import {DeleteDialog} from "../../dialogs/DeleteDialog";


export const EditSectionForm = (props) => {
    const classes = useStyles();

    let [sectionID, setSectionID] = React.useState(null);
    let [name, setName] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [sectionTypeID, setSectionTypeID] = React.useState(null);
    let [subjectID, setSubjectID] = React.useState(null);

    let [subjects, setSubjects] = React.useState([]);
    let [sectionTypes, setSectionTypes] = React.useState([]);

    useEffect(() => {
        async function fetchSubject(id) {
            const api = new SubjectAPI();
            return await api.GetSubject(id);
        }

        async function fetchSection(id) {
            const api = new SectionAPI();
            return await api.GetSection(id);
        }

        if (props.location.state === undefined) {
            let subjectID = window.location.pathname.split('/')[2];
            let sectionID = window.location.pathname.split('/')[3];

            fetchSubject(subjectID).then((s) => {
                setSubjectID(s.id);
                fetchSection(sectionID).then((s) => {
                    setSectionID(s.id);
                    setName(s.name);
                    setDescription(s.description);
                    setSectionTypeID(s.section_type_id);
                })
            });
        } else {
            setSubjectID(props.location.state.subject.id);
            setSectionID(props.location.state.section.id);
            setName(props.location.state.section.name);
            setDescription(props.location.state.section.description);
            setSectionTypeID(props.location.state.section.section_type_id);
        }
    }, [props]);

    useEffect(() => {
        async function fetchData() {
            const subjectAPI = new SubjectAPI();
            const sectionTypeAPI = new SectionTypeAPI();

            let subjects = await subjectAPI.GetAllSubjects();
            setSubjects(subjects);

            let sectionTypes = await sectionTypeAPI.GetAllSectionTypes();
            setSectionTypes(sectionTypes);
        }

        fetchData();
    }, []);

    const updateSection = async (event) => {
        event.preventDefault();
        const api = new SectionAPI();
        await api.UpdateSection(sectionID, name, description, subjectID, sectionTypeID);
        history.push(`/view/${subjectID}/${sectionID}`);
    }

    const deleteSection = async () => {
        const api = new SectionAPI();
        await api.DeleteSection(sectionID);
        history.push(`/view/${subjectID}`);
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Редактирование раздела
            </Typography>
            <form onSubmit={(event => updateSection(event))}>
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
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-section-type-label">Tag</InputLabel>
                    <Select
                        required
                        labelId="select-section-type-label"
                        id="select-section-type"
                        value={sectionTypeID}
                        autoWidth
                        displayEmpty
                        className={classes.selectEmpty}
                        onChange={(event => setSectionTypeID(event.target.value))}
                    >
                        {sectionTypes.map((st, i) => {
                            return <MenuItem key={i} value={st.id}>{st.name}</MenuItem>
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
                <DeleteDialog deleteCallback={() => deleteSection()} />
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
