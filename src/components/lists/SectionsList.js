import React, {useEffect} from "react";

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import {SectionAPI} from "../../http/api/admin/SectionAPI";

import history from "../../history";
import CircularProgress from "@material-ui/core/CircularProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SubjectAPI} from "../../http/api/admin/SubjectAPI";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Link from "@material-ui/core/Link";
import {DeleteDialog} from "../dialogs/DeleteDialog";


export const SectionsList = (props) => {
    const classes = useStyles();
    let [subject, setSubject] = React.useState(null);
    let [sections, setSections] = React.useState([]);

    useEffect(() => {
        async function fetchData(s) {
            const api = new SectionAPI();
            let response = await api.GetSectionsBySubjectID(s.id);
            setSections(response);
        }

        async function fetchSubject(id) {
            const api = new SubjectAPI();
            return await api.GetSubject(id);
        }

        if (props.location.state === undefined) {
            let subjectID = window.location.pathname.split('/')[2];
            fetchSubject(subjectID).then((s) => {
                setSubject(s);
                fetchData(s);
            });
        } else {
            setSubject(props.location.state.subject);
            fetchData(props.location.state.subject);
        }

    }, [props]);

    const deleteSection = async (id) => {
        const api = new SectionAPI();
        await api.DeleteSection(id);
        window.location.reload();
    }

    if (subject === null) return <CircularProgress />
    else return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Разделы предмета "{subject.name}"
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href={"/view"}>
                    Главная
                </Link>
                <Typography color="textPrimary">{subject.name}</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <List component="nav">
                {sections.map((s) => {
                    return <ListItem button key={s.id}
                                     onClick={() => history.push({
                                             pathname: `/view/${subject.id}/${s.id}`,
                                             state: {subject: subject, section: s},
                                         }
                                     )}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={s.name} />
                        <ListItemSecondaryAction>
                            <DeleteDialog deleteCallback={() => deleteSection(s.id)} />
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
