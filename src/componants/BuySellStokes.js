import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import { formatDecimals } from '../utilities/Utility';

const useStyles = makeStyles((theme) => ({
    buyTitleBar: {
        backgroundColor: '#3f51b5',
        color: '#fff'
    },
    sellTitleBar: {
        backgroundColor: '#ff5722',
        color: '#fff'
    },
    content: {
        margin: '20px 0 10px'
    },
    title: {
        fontSize: '0.85rem'
    },
    buyBtn: {
        backgroundColor: '#3f51b5'
    },
    sellBtn: {
        backgroundColor: '#ff5722',
        '&:hover': {
            backgroundColor: '#fd5c29'
        }
    }
}))

function BuySellStokes(props) {
    // const initialOrder = {
    //     symbol: '',
    //     price: '',
    //     marketORLimit: '',
    //     qty: '',
    //     totalPrice: ''
    // }
    const classes = useStyles();
    const { buySellModel, handleCloseBuySellModel, selectedStoke, bsStatus, buyOrSellStoke } = props;
    const stokeSelected = selectedStoke.stoke;
    const [numberOfStokes, SetNumberOfStokes] = useState(1)
    const [limitPrice, setLimitPrice] = useState(0)
    const [radioGroupValue, setRadioGroupValue] = useState('market')
    const [disableEnableRadio, setDisableEnableRadio] = useState(true)
    const [switchChecked, setSwitchChecked] = useState(bsStatus);
    const [totalAmt, setTotalAmt] = useState(0)
    const [limitErrorMsg, setlimitErrorMsg] = useState(false);
    const [dummyArray, setdummyArray] = useState([]);

    // const [orderObj, setorderObj] = useState({})
    const fixedPrice = 45.56;
    const num = stokeSelected.dayEndClose ? stokeSelected.dayEndClose : fixedPrice;
    const price = Number(num);

    useEffect(() => {
        setTotalAmt(price * numberOfStokes);
    }, [numberOfStokes])

    const handleNoOfStokeChange = (e) => {
        let num = e.target.value
        SetNumberOfStokes(num);
        setlimitErrorMsg('');
    }

    const handleLimitPriceChange = (e) => {
        let limit = e.target.value
        setLimitPrice(limit);
        setlimitErrorMsg(false);
    }

    const handleRadioChange = (e) => {
        setRadioGroupValue(e.target.value)
        if (radioGroupValue === 'market') {
            setDisableEnableRadio(false);
            setLimitPrice(0)
        } else if (radioGroupValue === 'limit') {
            setDisableEnableRadio(true);
            setLimitPrice(0)
        }
        setlimitErrorMsg(false);
    }

    const toggleChecked = () => {
        setSwitchChecked((prev) => !prev);
    }

    const handleBuySellStoke = () => {
        const orderObject = {
            numberOfStokes,
            limitPrice,
            radioGroupValue,
            totalAmt,
            switchChecked: switchChecked ? "Buy" : "Sell",
            symbol: stokeSelected.symbol ? stokeSelected.symbol : stokeSelected.Symbol
        }
        if(limitPrice === 0 && radioGroupValue === 'limit') {
            setlimitErrorMsg(true)
            return true
        } else if(totalAmt >= 10000) {
            return true
        }
        buyOrSellStoke(orderObject);
        setdummyArray([...dummyArray, orderObject])
        console.log('clik' + JSON.stringify(dummyArray));
    }

    return (
        <div>
            <Dialog
                open={buySellModel}
                onClose={handleCloseBuySellModel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle className={`${switchChecked ? [classes.buyTitleBar] : [classes.sellTitleBar]}`} style={{ cursor: 'move' }} id="responsive-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            <Typography className={classes.title} variant="caption" display="block" gutterBottom>
                                {switchChecked ? "Buy" : "Sell"} {stokeSelected.symbol ? stokeSelected.symbol : stokeSelected.Symbol} x {numberOfStokes} Qty
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                ₹ {stokeSelected.dayEndClose ? stokeSelected.dayEndClose : fixedPrice} on NSE
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel className="custom-switch"
                                control={<Switch size="small" checked={!switchChecked} onChange={toggleChecked} />}
                            />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <RadioGroup row aria-label="position" name="position" value={radioGroupValue} onChange={handleRadioChange}>
                        <FormControlLabel
                            value="market"
                            control={<Radio />}
                            label="Market"
                            labelPlacement="end"
                            size="small"
                        />
                        <FormControlLabel
                            value="limit"
                            control={<Radio />}
                            label="Limit"
                            labelPlacement="end"
                            size="small"
                        />
                    </RadioGroup>
                    <div className={classes.content}>
                        <TextField
                            id="outlined-number-qty"
                            label="Qty."
                            type="number"
                            autoFocus
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            variant="outlined"
                            value={numberOfStokes}
                            onChange={handleNoOfStokeChange}
                        />
                        &nbsp;&nbsp;
                    <TextField
                            id="outlined-number-price"
                            label="Price"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            variant="outlined"
                            disabled={disableEnableRadio}
                            value={limitPrice}
                            onChange={handleLimitPriceChange}
                        />
                    </div>
                    <Typography variant="caption" style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between'}} gutterBottom>
                        <span style={{display: "block"}}>Total: {stokeSelected.dayEndClose ? stokeSelected.dayEndClose : fixedPrice} * {numberOfStokes} = {formatDecimals(totalAmt, 2)}</span>
                        <span style={{display: "block"}}>
                        {
                            totalAmt >= 10000 && <span style={{color: 'red'}}>Available cash / Margin available exceded 10K<br /></span> 
                        }
                        {
                            limitErrorMsg && <span style={{color: 'red'}}>Limit must be greater then 0</span>
                        }
                        </span>
                    </Typography>
                    <Typography variant="caption" style={{marginTop: '15px', display: 'block'}} gutterBottom>
                        Available cash / Margin available: <strong>₹ 10,000</strong>
                        <br />
                        * Market - Buy / Sell stoke/s at the current market price
                        <br />
                        * Limit - Buy / Sell stoke/s when price meets specified limit
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleBuySellStoke}
                        className={`${switchChecked ? [classes.buyBtn] : [classes.sellBtn]}`}
                    >
                        {switchChecked ? 'Buy' : 'Sell'}
                    </Button>
                    <Button onClick={handleCloseBuySellModel} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BuySellStokes
