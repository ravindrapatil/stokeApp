import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';

import Routes from '../routes/Routes'
import Header from './Header';
import Sidebar from './Sidebar';
import BuySellStokes from './BuySellStokes'

export const AppDataContext = React.createContext();

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

function Dashboard(props) {
    const classes = useStyles();
    const [open, SetOpen] = useState(true);
    const [buySellModel, setbuySellModel] = useState(false);
    const [selectedStoke, setSelectedStoke] = useState({});
    const [bsStatus, setbsStatus] = useState(true);
    const [orderList, setorderList] = useState([]);
    const [chartData, setChartData] = useState({})

    const handleDrawerOpen = () => {
        SetOpen(true)
    }

    const handleDrawerClose = () => {
        SetOpen(false)
    }

    const buySellStokes = (stoke, flag, buySellStatus) => {
        setbuySellModel(flag);
        setSelectedStoke({ ...selectedStoke, stoke });
        if (buySellStatus === 'buy') {
            setbsStatus(true);
        } else if (buySellStatus === 'sell') {
            setbsStatus(false);
        }
    }

    const handleCloseBuySellModel = () => {
        setbuySellModel(false)
    }

    const buyOrSellStoke = ((order) => {
        setorderList([...orderList, order]);
        setbuySellModel(false);
        props.history.push('/orders');
    })

    const goToChart = (data) => {
        console.log('clicked.....');
        setChartData(data);
        props.history.push('/chart');
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} buySellStokes={buySellStokes} goToChart={goToChart} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <Switch>
                    {Routes.map((route) => (
                        // <Route exact path={route.path} key={route.path} render={() => (
                        //     <AppDataContext.Provider value={{ orderList }}>
                        //         <route.component project = {{name: 'Stoke App', chartData: chartData}} />
                        //     </AppDataContext.Provider>
                        // )}>
                        // </Route>
                        <Route exact path={route.path} key={route.path}>
                            <AppDataContext.Provider value={{ orderList }}>
                                <route.component />
                            </AppDataContext.Provider>
                        </Route>
                    ))}
                </Switch>
            </main>
            {
                buySellModel && <BuySellStokes
                    buySellModel={buySellModel}
                    selectedStoke={selectedStoke}
                    handleCloseBuySellModel={handleCloseBuySellModel}
                    buyOrSellStoke={buyOrSellStoke}
                    bsStatus={bsStatus}
                    goToChart={goToChart} />
            }
        </div>
    )
}

export default withRouter(Dashboard)
