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
import {LessonAPI} from "../../http/api/admin/LessonAPI";
import moment from "moment";


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
            <Typography variant="body2" color="textSecondary" component="p">
                Видимый: {lesson["is_visible"] ? "да" : "нет"} <br /><br />
                Создано: {moment(lesson["created_at"]).format('LLL')} <br />
                Обновлено: {moment(lesson["updated_at"]).format('LLL')} <br />
            </Typography>
            <br />
            <Button size="small" onClick={() =>
                history.push({
                    pathname: `/lesson/${lesson.id}/edit`,
                    state: {
                        lesson: lesson,
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
