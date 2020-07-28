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
import {MaterialAPI} from "../../http/api/admin/MaterialAPI";


export const SingleMaterialView = (props) => {
    const classes = useStyles();

    let [subject, setSubject] = React.useState(null);
    let [section, setSection] = React.useState(null);
    let [material, setMaterial] = React.useState(null);

    useEffect(() => {
        async function fetchSubject(id) {
            const api = new SubjectAPI();
            return await api.GetSubject(id);
        }

        async function fetchSection(id) {
            const api = new SectionAPI();
            return await api.GetSection(id);
        }

        async function fetchMaterial(id) {
            const api = new MaterialAPI();
            return await api.GetMaterial(id);
        }

        if (props.location.state === undefined) {
            let materialID = window.location.pathname.split('/')[2];

            fetchMaterial(materialID).then((m) => {
                setMaterial(m);
                fetchSection(m.section_id).then((s) => {
                    setSection(s);
                    fetchSubject(s.subject_id).then((s) => {
                        setSubject(s);
                    });
                });
            });

        } else {
            setSubject(props.location.state.subject);
            setSection(props.location.state.section);
            setMaterial(props.location.state.material);
        }
    }, [props]);

    // await subject
    if (subject === null) return <CircularProgress />
    else return (
        <div className={classes.root}>
            <Typography variant="h5" component="h1">
                {material.name}
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
                <Typography color="textPrimary">{material.name}</Typography>
            </Breadcrumbs>
            <br />
            <Divider />
            <Typography variant="body1" component="p">
                <div dangerouslySetInnerHTML={{__html: material.content}} />
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
                Видимый: {material["is_visible"] ? "да" : "нет"} <br /><br />
                Создано: {(new Date(material["created_at"])).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })} <br />
                Обновлено: {(new Date(material["updated_at"])).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })} <br />
            </Typography>
            <br />
            <Button size="small" onClick={() =>
                history.push({
                    pathname: `/material/${material.id}/edit`,
                    state: {
                        material: material,
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
