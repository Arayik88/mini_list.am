import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function AlertComp(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Alert(props)
{
    return ( <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <AlertComp onClose={props.handleClose} severity={props.severity}>
            {props.message}
        </AlertComp>
    </Snackbar>)
}