import React from 'react';
import { Route } from "react-router-dom";
import history from "../history";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CreateIcon from '@material-ui/icons/Create';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {SubjectsList} from "../components/lists/SubjectsList";
import {SectionsList} from "../components/lists/SectionsList";
import {TasksList} from "../components/lists/TasksList";
import {SingleTaskView} from "../components/views/SingleTaskView";
import {CreateTaskForm} from "../components/forms/create/CreateTaskForm";
import {CreateSubjectForm} from "../components/forms/create/CreateSubjectForm";
import {CreateSectionForm} from "../components/forms/create/CreateSectionForm";
import {EditTaskForm} from "../components/forms/edit/EditTaskForm";

/*
 Главная страница с шапкой и сайдбаром.
 Основной контент отрисовывается здесь.
 */
export const IndexPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (window.location.pathname === '/') history.push('/view');
    else return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap
                                style={{cursor: "pointer"}}
                                onClick={() => history.push('/view')}>
                        MCS Service
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={"Новый предмет"} onClick={() => history.push('/new_subject')}>
                        <ListItemIcon>{ <BookIcon />}</ListItemIcon>
                        <ListItemText primary={"Новый предмет"} />
                    </ListItem>
                    <ListItem button key={"Новый раздел"} onClick={() => history.push('/new_section')}>
                        <ListItemIcon>{ <BookmarkIcon />}</ListItemIcon>
                        <ListItemText primary={"Новый раздел"} />
                    </ListItem>
                    <ListItem button key={"Новая задача"} onClick={() => history.push('/new_task')}>
                        <ListItemIcon>{ <CreateIcon />}</ListItemIcon>
                        <ListItemText primary={"Новая задача"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key={"Выход"} onClick={() => history.push('/login')}>
                        <ListItemIcon>{ <ExitToAppIcon />}</ListItemIcon>
                        <ListItemText primary={"Выход"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/*Nested routing*/}
                <Route exact path="/new_task" component={CreateTaskForm} />
                <Route exact path="/new_subject" component={CreateSubjectForm} />
                <Route exact path="/new_section" component={CreateSectionForm} />

                <Route exact path="/view" component={SubjectsList} />
                <Route exact path="/view/:subject_id" component={SectionsList} />
                <Route exact path="/view/:subject_id/:section_id" component={TasksList} />
                <Route exact path="/view/:subject_id/:section_id/:task_id" component={SingleTaskView} />

                <Route exact path="/edit/:subject_id/:section_id/:task_id" component={EditTaskForm} />
            </main>
        </div>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
