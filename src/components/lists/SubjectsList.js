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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SchoolIcon from '@material-ui/icons/School';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {StatsView} from "../views/StatsView";


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
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={s.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete"
                                        onClick={() => history.push(`/edit/${s.id}`)}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
            <Divider /><br />
            <StatsView />
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
