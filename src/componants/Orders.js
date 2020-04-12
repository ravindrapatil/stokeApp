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
    orange: {
        backgroundColor: '#ffe0d6'
    },
    blue: {
        backgroundColor: '#d0d7fd'
    },
    tableHeadRow: {
        backgroundColor: '#3f51b5'
    },
    headTextColor: {
        color: '#fff'
    },
    td: {
        borderBottom: '1px solid #9ca6e2'
    }
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
                        <Table className={classes.table} aria-label="Order/s table">
                            <TableHead>
                                <TableRow className={classes.tableHeadRow}>
                                    <TableCell className={classes.headTextColor}>Instrument</TableCell>
                                    <TableCell className={classes.headTextColor} align="right">Buy/Sell</TableCell>
                                    <TableCell className={classes.headTextColor} align="right">Avg. Price</TableCell>
                                    <TableCell className={classes.headTextColor} align="right">Limit Price</TableCell>
                                    <TableCell className={classes.headTextColor} align="right">Qty.</TableCell>
                                    <TableCell className={classes.headTextColor} align="right">Profit/Loss</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appMainData.orderList.map((row, index) => (
                                    <TableRow key={index} className={`${row.switchChecked === 'Buy' ? [classes.blue] : [classes.orange]} ${classes.red}`} >
                                        <TableCell className={classes.td} component="th" scope="row">{row.symbol}</TableCell>
                                        <TableCell className={classes.td} align="right">{row.switchChecked}</TableCell>
                                        <TableCell className={classes.td} align="right">{row.limitPrice === 0 ? <span>{row.dayEndClose}</span> : <span style={{ textDecorationLine: 'line-through' }}>{row.dayEndClose}</span>}</TableCell>
                                        <TableCell className={classes.td} align="right">{row.limitPrice}</TableCell>
                                        <TableCell className={classes.td} align="right">{row.numberOfStokes}</TableCell>
                                        <TableCell className={classes.td} align="right">{formatDecimals(row.totalAmt, 2)}</TableCell>
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
