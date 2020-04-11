import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { AppDataContext } from '../componants/Dashboard'
import { formatDecimals } from '../utilities/Utility';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Orders() {
    const classes = useStyles();
    const appMainData = useContext(AppDataContext)
    return (
        <div>
            <Typography variant="h4" align="left" style={{paddingBottom: '25px'}}>
                Order/s
            </Typography>
            {
                appMainData.orderList && appMainData.orderList.length ?
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Instrument</TableCell>
                                    <TableCell align="right">Buy/Sell</TableCell>
                                    <TableCell align="right">Avg. Price</TableCell>
                                    <TableCell align="right">Limit Price</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Profit/Loss</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appMainData.orderList.map((row) => (
                                    <TableRow key={row.symbol}>
                                        <TableCell component="th" scope="row">{row.symbol}</TableCell>
                                        <TableCell align="right">{row.switchChecked}</TableCell>
                                        <TableCell align="right">{row.limitPrice === 0 ? <span>{row.dayEndClose}</span> : <span style={{ textDecorationLine: 'line-through' }}>{row.dayEndClose}</span>}</TableCell>
                                        <TableCell align="right">{row.limitPrice}</TableCell>
                                        <TableCell align="right">{row.numberOfStokes}</TableCell>
                                        <TableCell align="right">{formatDecimals(row.totalAmt, 2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <p>No data found</p> 
            }

        </div>
    )
}

export default Orders
