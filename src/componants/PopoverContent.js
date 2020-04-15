import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import StokesMiniInfo from './StokesMiniInfo';

const useStyles = makeStyles((theme) => ({
    smallBtn: {
        minWidth: '30px',
        marginRight: '10px',
        padding: '1px 0',
        fontSize: '12px'
    },
    smallBtnWithIcons: {
        backgroundColor: '#fff',
        minWidth: '30px',
        marginRight: '10px',
        padding: '1px 0',
        fontSize: '12px',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        }
    },
    listItemStyle: {
        borderBottom: '1px solid #efeeee',
        position: 'relative',
        display: 'block'
    },
    hoverContainer: {
        position: 'absolute',
        top: '0',
        left: '0',
        // height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        // alignItems: 'center'
    },
    listTextFont: {
        fontSize: '0.840rem'
    },
    companyNameText: {
        fontSize: '0.740rem',
        color: '#abaaaa'
    },
    dayEndClose: {
        display: 'inline-block',
        width: '54px',
        textAlign: 'right',
        color: '#222'
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    },
    topone: {
        top: '10px'
    },
    toptwo: {
        top: '16px'
    },
    sellBtn: {
        backgroundColor: '#ff5722',
        '&:hover': {
            backgroundColor: '#fd5c29'
        }
    }
}))

function PopoverContent(props) {
    const classes = useStyles();
    const { index, result, stokeResult, removeStoke, buySellStokes, goToChart } = props;
    const [btnState, setbtnState] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const onMouseOver = (e, result) => {
        setbtnState(true)
    }

    const onMouseOut = (e, result) => {
        setbtnState(false)
    }

    const TF = btnState ? '#f2f2f2' : '#fff'

    const handleMoreInfo = ((stoke) => {
        if (expanded) {
            setExpanded(false)
        } else {
            setExpanded(true)
        }
    })

    const removeStokes = ((data, index, flag) => {
        removeStoke(data, index);
        setExpanded(flag);
    })

    const goToChart2 = ((data) => {
        let code = data.symbol ? data.symbol : data.Symbol;
        props.history.push('/chart/' + code);
    })

    return (
        <ListItem
            onMouseEnter={(event) => onMouseOver(event, result ? result : stokeResult)}
            onMouseLeave={(event) => onMouseOut(event, result ? result : stokeResult)}
            style={{ backgroundColor: TF }}
            className={`${classes.listItemStyle} ${stokeResult ? 'stokeList' : ''}`}
        >
            <ListItemText>
                <Typography variant='body1' className={classes.listTextFont}>
                    {
                        result && result['Symbol']
                    }
                    {
                        stokeResult && stokeResult['symbol']
                    }
                </Typography>

                {
                    result && <Typography variant='body2' className={classes.companyNameText}>
                        {result['Company Name']} </Typography>
                }

                {
                    stokeResult && <Typography variant='body2' className={classes.companyNameText}>
                        <span className={`${stokeResult.mPC.includes('-') ? [classes.red] : [classes.green]}`}>{stokeResult['mPC']}</span>  <span className={classes.dayEndClose}>{stokeResult['dayEndClose']}</span> </Typography>
                }

                {
                    btnState ?
                        <div className={`${classes.hoverContainer} ${result ? [classes.toptwo] : [classes.topone]}`}>
                            <Tooltip title="Buy(B)">
                                <Button size="small" className={classes.smallBtn} onClick={() => buySellStokes(result ? result : stokeResult, true, 'buy')} variant="contained" color="primary">
                                    B
                                </Button>
                            </Tooltip>
                            <Tooltip title="Sell(S)">
                                <Button size="small" className={`${classes.smallBtn} ${classes.sellBtn}`} onClick={() => buySellStokes(result ? result : stokeResult, true, 'sell')} variant="contained" color="secondary">
                                    S
                                </Button>
                            </Tooltip>
                            <Tooltip title="Chart">
                                <Button size="small" className={`${classes.smallBtnWithIcons}`} onClick={() => goToChart2(result ? result : stokeResult)} variant="contained">
                                    <TrendingUpRoundedIcon />
                                </Button>
                            </Tooltip>
                            {
                                stokeResult && <Tooltip title="Delete">
                                    <Button size="small" className={classes.smallBtnWithIcons} onClick={() => removeStokes(result ? result : stokeResult, index, false)} variant="contained">
                                        <DeleteOutlinedIcon />
                                    </Button>
                                </Tooltip>
                            }
                            <Tooltip title="More">
                                <Button size="small" className={classes.smallBtnWithIcons} onClick={() => handleMoreInfo(result ? result : stokeResult)} variant="contained">
                                    <MoreHorizOutlinedIcon />
                                </Button>
                            </Tooltip>
                            {/* <Tooltip title="Add to List">
                                <Button size="small" className={classes.smallBtn} onClick={() => addToStockList(result ? result : stokeResult)} variant="contained" color="primary">
                                    +
                                </Button>
                            </Tooltip> */}
                        </div>
                        :
                        ''
                }
            </ListItemText>
            {
                expanded &&
                <ListItemText>
                    <StokesMiniInfo stokeInfo={stokeResult} searchStoke={result} />
                </ListItemText>
            }
        </ListItem>
    )
}

export default withRouter(PopoverContent)
