import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { useOktaAuth } from '@okta/okta-react';

function Mainpage() {
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
            <br />
            {
                userInfo && <Typography variant="h4" style={{ paddingBottom: '25px' }}>
                    Hi, {userInfo.name}
                </Typography>
            }
            <Typography variant="h5" style={{ paddingBottom: '15px' }}>
                Equity
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h5" style={{ margin: '0 0 10px' }}>
                        10K
                    </Typography>
                    <Typography variant="caption" style={{color: '#848484'}}>
                        Margin Available
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="caption" style={{ display: 'block', margin: '10px 0 10px' }}>
                        <span style={{color: '#848484'}}>Margins used</span> 0
                    </Typography>
                    <Typography variant="caption" style={{ display: 'block' }}>
                    <span style={{color: '#848484'}}>Opening Balance</span> 8.05k
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Mainpage
