import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from '../routes/Routes'
import Header from './Header';
import Sidebar from './Sidebar';
import BuySellStokes from './BuySellStokes'

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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
}));

function Dashboard() {
    const classes = useStyles();
    const [open, SetOpen] = useState(true);

    const [buySellModel, setbuySellModel] = useState(false);
    const [selectedStoke, setSelectedStoke] = useState({});
    const [bsStatus, setbsStatus] = useState(true);
    const [orderList, setorderList] = useState([]);

    const handleDrawerOpen = () => {
        SetOpen(true)
    }

    const handleDrawerClose = () => {
        SetOpen(false)
    }

    const buySellStokes = (stoke, flag, buySellStatus) => {
        console.log('Dashboard Ravindra - ' + JSON.stringify(stoke) + ' ' + flag);
        setbuySellModel(flag);
        setSelectedStoke({...selectedStoke, stoke});
        if(buySellStatus === 'buy') {
            console.log('buy');
            setbsStatus(true);
        } else if(buySellStatus === 'sell') {
            console.log('sell');
            setbsStatus(false);
        }
    }

    const handleCloseBuySellModel = () => {
        setbuySellModel(false)
    }

    const buyOrSellStoke = ((order) => {
        setorderList([...orderList, order]);
        setbuySellModel(false);
        console.log("Ravindra " + JSON.stringify(orderList));
    })

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} buySellStokes={buySellStokes} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <Switch>
                    {Routes.map((route) => (
                        <Route exact path={route.path} key={route.path}>
                            <route.component />
                        </Route>
                    ))}
                </Switch>
            </main>
            {
                buySellModel && <BuySellStokes 
                    buySellModel={buySellModel} 
                    selectedStoke={selectedStoke} 
                    handleCloseBuySellModel={handleCloseBuySellModel}
                    buyOrSellStoke = {buyOrSellStoke} 
                    bsStatus={bsStatus} />
            }
        </div>
    )
}

export default Dashboard
