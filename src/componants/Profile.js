import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { useOktaAuth } from '@okta/okta-react';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        fontSize: '2rem',
        backgroundColor: '#ff5722'
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px'
    },
    name: {
        paddingLeft: '30px'
    },
    label: {
        color: '#989898'
    },
    sectionsHeader: {
        borderBottom: '1px solid #e8e8e8',
        paddingBottom: '10px',
        marginBottom: '20px',
        marginTop: '40px'
    }
}));

function Profile() {
    const classes = useStyles();
    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            setUserInfo(null)
        } else {
            authService.getUser().then((info) => {
                setUserInfo(info)
            })
        }
    }, [authState, authService])

    return (
        <div>
            <Typography variant="h4" style={{ paddingBottom: '25px' }}>
                Profile
            </Typography>
            {
                !userInfo && <p style={{textAlign: 'center'}}>loading....</p>
            }
            {
                userInfo &&
                <>
                    <div className={classes.avatar}>
                        <Avatar size="large" className={classes.large}>{userInfo.given_name.charAt(0)}{userInfo.family_name.charAt(0)}</Avatar>
                        <Typography variant="h6" className={classes.name}>
                            {userInfo.name}
                        </Typography>
                    </div>
                    <Typography variant="h6" className={classes.sectionsHeader}>
                        Personal
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3} className={classes.label}>Email</Grid>
                        <Grid item xs={3}>{userInfo.email}</Grid>
                        <Grid item xs={3} className={classes.label}>PAN</Grid>
                        <Grid item xs={3}>{'BMOQS3665H'.replace(/.(?=.{3,}$)/g, '*')}</Grid>
                        <Grid item xs={3} className={classes.label}>Phone</Grid>
                        <Grid item xs={3}>{'9008093481'.replace(/.(?=.{3,}$)/g, '*')}</Grid>
                        <Grid item xs={3} className={classes.label}>Zone info</Grid>
                        <Grid item xs={3}>{userInfo.zoneinfo}</Grid>
                    </Grid>
                    <Typography variant="h6" className={classes.sectionsHeader}>
                        Bank Accounts
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3} className={classes.label}>Account</Grid>
                        <Grid item xs={3}>{'789087657890'.replace(/.(?=.{3,}$)/g, '*')}</Grid>
                        <Grid item xs={3} className={classes.label}>Bank</Grid>
                        <Grid item xs={3}>AXIS BANK LTD</Grid>
                    </Grid>
                </>
            }
        </div>
    )
}

export default Profile
