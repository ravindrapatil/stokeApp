import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    label: {
        color: '#515b66'
    },
    valueStyle: {
        fontWeight: 'bold',
        color: '#0d3244'
    },
    capitalizeTxt: {
        textTransform: 'capitalize'
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    },
}))

function StokesMiniInfo(props) {

    const { stokeInfo, searchStoke } = props
    const classes = useStyles()
    return (
        <div style={{ marginTop: '10px', fontSize: '0.710rem', flexGrow: 1 }}>
            {
                stokeInfo &&
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <span className={classes.label}>Open:</span> &nbsp;
                        <span className={classes.valueStyle}>{stokeInfo.open}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.label}>Close:</span> &nbsp;
                        <span className={classes.valueStyle}>{stokeInfo.dayEndClose}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.label}>High:</span> &nbsp;
                        <span className={classes.valueStyle}>{stokeInfo.high}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.label}>Low:</span> &nbsp;
                        <span className={classes.valueStyle}>{stokeInfo.low}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.label}>Year PC:</span> &nbsp;
                        <span className={`${classes.valueStyle} ${stokeInfo.yPC.includes('-') ? [classes.red] : [classes.green]}`}>{stokeInfo.yPC}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.label}>Month PC:</span> &nbsp;
                        <span className={`${classes.valueStyle} ${stokeInfo.mPC.includes('-') ? [classes.red] : [classes.green]}`}>{stokeInfo.mPC}</span>
                    </Grid>
                </Grid>
            }
            {
                searchStoke &&
                <div>
                    <p><span className={classes.label}>Industry:</span> <span className={classes.capitalizeTxt}>{searchStoke.Industry}</span></p>
                    <p style={{lineHeight: '0'}}><span className={classes.label}>ISIN Code:</span> {searchStoke['ISIN Code']}</p>
                </div>
            }

        </div>
    )
}

export default StokesMiniInfo
