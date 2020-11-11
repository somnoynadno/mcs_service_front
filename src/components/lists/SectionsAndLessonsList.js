import React, {useEffect} from "react";
import history from "../../history";

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {SectionAPI} from "../../http/api/admin/SectionAPI";

import CircularProgress from "@material-ui/core/CircularProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SubjectAPI} from "../../http/api/admin/SubjectAPI";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Link from "@material-ui/core/Link";
import CancelIcon from '@material-ui/icons/Cancel';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from '@material-ui/icons/Edit';
import {sortArrayByKey} from "../../helpers";
import IconButton from "@material-ui/core/IconButton";
import {LessonAPI} from "../../http/api/admin/LessonAPI";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export const SectionsAndLessonsList = (props) => {
    const classes = useStyles();
    let [subject, setSubject] = React.useState(null);
    let [sections, setSections] = React.useState([]);
    let [lessons, setLessons] = React.useState([]);

    useEffect(() => {
        async function fetchData(s) {
            const sectionAPI = new SectionAPI();
            let r = await sectionAPI.GetSectionsBySubjectID(s.id);
            setSections(r);

            const lessonAPI = new LessonAPI();
            let l = await lessonAPI.GetLessonsBySubjectID(s.id);
            setLessons(l);
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
                {sortArrayByKey(sections, "section_type_id").map((s) => {
                    return <ListItem button key={s.id} className={classes[s["section_type"]["name"]]}
                                     onClick={() => history.push({
                                             pathname: `/view/${subject.id}/${s.id}`,
                                             state: {subject: subject, section: s},
                                         }
                                     )}>
                        <ListItemIcon>
                            {s["section_type"]["name"] === "main" ?
                                <BookmarkIcon /> : s["section_type"]["name"] === "experimental" ?
                                    <BookmarkBorderIcon /> : s["section_type"]["name"] === "suggestion" ?
                                        <ErrorOutlineIcon /> : s["section_type"]["name"] === "rejected" ?
                                            <CancelIcon /> : <BookmarkIcon />
                            }
                        </ListItemIcon>
                        <ListItemText primary={s.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete"
                                        onClick={() => history.push(`/edit/${subject.id}/${s.id}`)}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
            <Divider />
            <br />
            <Typography component="h1" variant="h6">
                Занятия предмета
            </Typography>
            <List>
                {lessons.map((l, i) => {
                    return <ListItem key={i} button onClick={() => history.push({
                            pathname: `/lesson/${l.id}`,
                            state: {subject: subject, lesson: l},
                        }
                    )}>
                        <ListItemIcon>
                            <ArrowForwardIosIcon />
                        </ListItemIcon>
                        <ListItemText primary={l.name} />
                    </ListItem>
                })}
            </List>
            <Divider />
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
                {subject.description.split('\n').map((text, index) => {
                    return <span key={index}>{text}<br /></span>})
                } <br />
                <Divider />
                <br />
                Преподаватели:
                <ul>
                {subject.teachers === null ? '' :
                    subject.teachers.split('\n').map((text, index) => {
                    return <li key={index}>{text}</li>})
                }
                </ul>
            </Typography>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 550,
        backgroundColor: theme.palette.background.paper,
    },
    suggestion: {
        backgroundColor: "#f6f5f8",
    },
    main: {
        backgroundColor: "white",
    },
    experimental: {
        backgroundColor: "#f8f8f5"
    },
    rejected: {
        opacity: 0.4,
        textDecoration: "line-through",
        backgroundColor: "white",
    }
}));
