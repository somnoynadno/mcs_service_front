import React, {useEffect} from "react";
import history from "../../history";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import {SubjectAPI} from "../../http/api/admin/SubjectAPI";
import {SectionAPI} from "../../http/api/admin/SectionAPI";
import {TaskAPI} from "../../http/api/admin/TaskAPI";


export const SingleTaskView = (props) => {
    const classes = useStyles();
    let [subject, setSubject] = React.useState(null);
    let [section, setSection] = React.useState(null);
    let [task, setTask] = React.useState(null);

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

        if (props.location.state === undefined) {
            let subjectID = window.location.pathname.split('/')[2];
            let sectionID = window.location.pathname.split('/')[3];
            let taskID = window.location.pathname.split('/')[4];

            fetchSubject(subjectID).then((s) => {
                setSubject(s);
                fetchSection(sectionID).then((s) => {
                    setSection(s);
                    fetchTask(taskID).then((t) => {
                        setTask(t);
                    });
                });
            });
        } else {
            setSubject(props.location.state.subject);
            setSection(props.location.state.section);
            setTask(props.location.state.task);
        }
    }, [props]);

    if (task === null) return <CircularProgress />
    else return (
        <div className={classes.root}>
            <Typography variant="h5" component="h1">
                {task.name}
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href={"/view"}>
                    Главная
                </Link>
                <Link color="inherit" href={"/view/" + subject.id}>
                    {subject.name}
                </Link>
                <Link color="inherit" href={"/view/" + subject.id + "/" + section.id}>
                    {section.name}
                </Link>
                <Typography color="textPrimary">{task.name}</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <Typography variant="body2" component="p">
                <h3>Описание:</h3>
                <div dangerouslySetInnerHTML={{__html: task.description}} />
            </Typography>
            <Typography variant="body2" component="p">
                <h3>Решение:</h3>
                <div dangerouslySetInnerHTML={{__html: task.solution}} />
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
                Автор: {task.author} <br />
                Сложность: {task.difficulty} <br />
                Tag: {task["task_type"]["name"]}
            </Typography>
            <br />
            <Button size="small" onClick={() =>
                history.push({
                    pathname: `/edit/${subject.id}/${section.id}/${task.id}`,
                    state: {
                        task: task,
                        section: section,
                        subject: subject
                    },
                })
            }
            >Редактировать
            </Button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 640,
        backgroundColor: theme.palette.background.paper,
    },
}));
