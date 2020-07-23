import React, {useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import {TaskAPI} from "../../http/api/admin/TaskAPI";

import history from "../../history";
import CircularProgress from "@material-ui/core/CircularProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SubjectAPI} from "../../http/api/admin/SubjectAPI";
import {SectionAPI} from "../../http/api/admin/SectionAPI";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {DeleteDialog} from "../dialogs/DeleteDialog";


export const TasksList = (props) => {
    const classes = useStyles();

    let [subject, setSubject] = React.useState(null);
    let [section, setSection] = React.useState(null);
    let [tasks, setTasks] = React.useState([]);

    useEffect(() => {
        async function fetchData(s) {
            const api = new TaskAPI();
            let response = await api.GetTasksBySectionID(s.id)
            setTasks(response);
        }

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
                setSubject(s);
                fetchSection(sectionID).then((s) => {
                    setSection(s);
                    fetchData(s);
                });
            });
        } else {
            setSubject(props.location.state.subject);
            setSection(props.location.state.section);
            fetchData(props.location.state.section);
        }

    }, [props]);

    const deleteTask = async (id) => {
        const api = new TaskAPI();
        await api.DeleteTask(id);
        window.location.reload();
    }

    if (section === null) return <CircularProgress />
    else return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Задачи раздела "{section.name}"
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href={"/view"}>
                    Главная
                </Link>
                <Link color="inherit" href={"/view/" + subject.id}>
                    {subject.name}
                </Link>
                <Typography color="textPrimary">{section.name}</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <List component="nav">
                {tasks.map((t) => {
                    return <ListItem button key={t.id}
                                     onClick={() => history.push({
                                             pathname: `/view/${subject.id}/${section.id}/${t.id}`,
                                             state: {subject: subject, section: section, task: t},
                                         }
                                     )}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={t.name} />
                        <ListItemSecondaryAction>
                            <DeleteDialog deleteCallback={() => deleteTask(t.id)} />
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
            <Divider />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
}));