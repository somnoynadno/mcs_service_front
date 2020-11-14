import React, {useEffect} from "react";
import history from "../../history";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import {LessonAPI} from "../../http/api/admin/LessonAPI";
import moment from "moment";
import {sortArrayByKey} from "../../helpers";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LabelIcon from "@material-ui/icons/Label";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {DeleteDialog} from "../dialogs/DeleteDialog";


export const SingleLessonView = (props) => {
    const classes = useStyles();

    let [lesson, setLesson] = React.useState(null);

    useEffect(() => {
        async function fetchLesson(id) {
            const api = new LessonAPI();
            return await api.GetLesson(id);
        }

        if (props.location.state === undefined) {
            let lessonID = window.location.pathname.split('/')[2];

            fetchLesson(lessonID).then((l) => {
                setLesson(l);
            });

        } else {
            setLesson(props.location.state.lesson);
        }
    }, [props]);

    const deleteLesson = async () => {
        const api = new LessonAPI();
        await api.DeleteLesson(lesson.id);
        history.push(`/view/${lesson.subject_id}`);
    }

    if (lesson === null) return <CircularProgress />
    else return (
        <div className={classes.root}>
            <Typography variant="h5" component="h1">
                {lesson.name}
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href={"/view"}>
                    Главная
                </Link>
                <Link color="inherit" href={"/view/" + lesson.subject_id}>
                    {lesson.subject.name}
                </Link>
                <Typography color="textPrimary">{lesson.name}</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <br />
            <Typography variant="body2" color="textPrimary" component="p">
                Начало: {moment(lesson["from_date"]).format('LLL')} <br />
                Дедлайн: {moment(lesson["due_date"]).format('LLL')} <br />
            </Typography>
            <br />
            <Typography variant="h6" component="h1">
                Задачи
            </Typography>
            <List component="nav">
                {lesson["tasks"] ?
                    sortArrayByKey(lesson["tasks"], "task_type_id").map((t) => {
                    return <ListItem button key={t.id}
                                     onClick={() => history.push({
                                             pathname: `/view/${lesson.subject_id}/${t.section_id}/${t.id}`
                                         }
                                     )}>
                        <ListItemIcon>
                            <LabelIcon />
                        </ListItemIcon>
                        <ListItemText primary={t.name} />
                    </ListItem>
                })
                    : <i>Список пуст</i>
                }
            </List>
            <br />
            <Divider />
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
                Видимый: {lesson["is_visible"] ? "да" : "нет"} <br /><br />
                Создано: {moment(lesson["created_at"]).format('LLL')} <br />
                Обновлено: {moment(lesson["updated_at"]).format('LLL')} <br />
            </Typography>
            <br /><br />
            <DeleteDialog deleteCallback={() => deleteLesson()} />
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
