import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Searchstokes from './Searchstokes';
import NiftyStockWatch from './NiftyStockWatch';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    appNameTypo: {
        lineHeight: '50px'
    },
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderRightWidth: '0'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerHeader2: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        backgroundColor: '#3f51b5',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    iconColor: {
        color: '#fff'
    }
}));

function Sidebar(props) {
    const { open, handleDrawerClose, buySellStokes, goToChart } = props;
    const classes = useStyles()
    const theme = useTheme();

    const sendClickEvent = () => {
        handleDrawerClose()
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader2}>
                <IconButton edge="start" onClick={sendClickEvent}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.iconColor} /> : <ChevronRightIcon className={classes.iconColor} />}
                </IconButton>
            </div>
            <Divider />
            <Searchstokes buySellStokes = {buySellStokes} goToChart = {goToChart} />
            <NiftyStockWatch buySellStokes = {buySellStokes} goToChart = {goToChart} />
        </Drawer>
    )
}

export default Sidebar
