import React, {useEffect} from "react";
import history from "../../history";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {SubjectAPI} from "../../http/api/admin/SubjectAPI";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import {DeleteDialog} from "../dialogs/DeleteDialog";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';


export const SubjectsList = () => {
    const classes = useStyles();
    let [subjects, setSubjects] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const api = new SubjectAPI();
            let response = await api.GetAllSubjects();
            setSubjects(response);
        }

        fetchData();
    }, []);

    const deleteSubject = async (id) => {
        const api = new SubjectAPI();
        await api.DeleteSubject(id);
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Все предметы
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Typography color="textSecondary">Главная</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <List component="nav">
                {subjects.map((s) => {
                    return <ListItem button key={s.id}
                                     onClick={() => history.push({
                                             pathname: `/view/${s.id}`,
                                             state: {subject: s},
                                         }
                                     )}>
                        <ListItemIcon>
                            <FolderOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary={s.name} />
                        <ListItemSecondaryAction>
                            <DeleteDialog deleteCallback={() => deleteSubject(s.id)} />
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
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
}));
