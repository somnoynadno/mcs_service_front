import React, {useEffect} from "react";
import history from "../../../history";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {TaskLessonAPI} from "../../../http/api/admin/TaskLessonAPI";
import {LessonAPI} from "../../../http/api/admin/LessonAPI";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TaskAPI} from "../../../http/api/admin/TaskAPI";


export const AddTasksToLessonForm = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    let [lesson, setLesson] = React.useState(null);
    let [tasks, setTasks] = React.useState([]);
    let [selectedTasks, setSelectedTasks] = React.useState([]);

    useEffect(() => {
        async function fetchLesson(id) {
            const api = new LessonAPI();
            return await api.GetLesson(id);
        }

        async function fetchTasks(lesson) {
            const api = new TaskAPI();
            return await api.GetTasksBySubjectID(lesson["subject_id"]);
        }

        if (props.location.state === undefined) {
            let lessonID = window.location.pathname.split('/')[2];

            fetchLesson(lessonID).then((l) => {
                setLesson(l);
                fetchTasks(l).then((t) => {
                    setTasks(t);
                })
            });

        } else {
            let lesson = props.location.state.lesson;

            setLesson(lesson);
            fetchTasks(lesson).then((t) => {
                setTasks(t);
            })
        }
    }, [props]);

    const handleChange = (event) => {
        setSelectedTasks(event.target.value);
    };

    const addTasksToLesson = async (event) => {
        event.preventDefault();

        const api = new TaskLessonAPI();
        await api.AddTasksToLesson(lesson.id, selectedTasks)

        history.push({pathname: `/lesson/${lesson.id}`});
    }

    if (lesson === null) return <CircularProgress />
    else return (
        <div>
            <Typography component="h1" variant="h5">
                Задачи занятия "{lesson.name}"
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="multiple-chip-label">Задачи</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value={selectedTasks}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {tasks.map((task) => (
                        <MenuItem key={task.id} value={task} style={getStyles(task, selectedTasks, theme)}>
                            {task.section.name + ": " + task.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <form onSubmit={(event => addTasksToLesson(event))}>
                <Button
                    style={{marginTop: 30}}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Продолжить
                </Button>
            </form>
        </div>
    )
}

function getStyles(task, selectedTasks, theme) {
    return {
        fontWeight:
            selectedTasks.indexOf(task) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 400,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 600,
        },
    },
};
