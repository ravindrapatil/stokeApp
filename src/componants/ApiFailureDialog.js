import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';

function ApiFailureDialog(props) {
    const {transition, open, handleClose } = props;
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            autoHideDuration={5000}
            className="snackbar"
            message="You do not have permission to view this dataset. Please subscribe to this database to get access."
        />
    )
}

export default ApiFailureDialog
