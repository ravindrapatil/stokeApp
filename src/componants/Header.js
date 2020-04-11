import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import { MenuList, ListItemText } from '@material-ui/core';
import { useOktaAuth } from '@okta/okta-react';

import Routes from '../routes/Routes'

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    appNameTypo: {
        lineHeight: '60px'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    menuDisplay: {
        display: 'inline-block'
    }
}));

function Header(props) {
    const { open, handleDrawerOpen } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const openAnchorEl = Boolean(anchorEl);
    const { authService } = useOktaAuth();

    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const sendData = () => {
        handleDrawerOpen()
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    const logout =  async () => {
        authService.logout('/');
    }

    return (
        <AppBar
            position="fixed"
            // className={clsx(classes.appBar, classes.ravi, {
            //     [classes.appBarShift]: open,
            // })}
            className={`${classes.appBar}, ${open ? [classes.appBarShift] : ''}`}
        >
            <Toolbar>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={sendData}
                            edge="start"
                            // className={clsx(classes.menuButton, open && classes.hide)}
                            className={`${classes.menuButton}, ${open ? [classes.hide] : ''}`}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.appNameTypo} variant="h5" noWrap>
                            Stock App
                            </Typography>
                    </Grid>
                    <Grid item>
                        <MenuList >
                            {Routes.map((prop, index) => {
                                return (
                                    <MenuItem 
                                        component={Link} 
                                        to={prop.path} 
                                        key={index} 
                                        selected={index === selectedIndex} 
                                        className={classes.menuDisplay}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                        <ListItemText primary={prop.name} />
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleMenu}
                            edge="end">
                            <PersonIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openAnchorEl}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}

export default Header
