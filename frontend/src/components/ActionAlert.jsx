import {Snackbar} from "@mui/material";
import Alert from '@mui/material/Alert';
import * as React from "react";
import {useAppContext} from "../AppContextProvider.jsx";

export default function ActionAlert() {
    const context = useAppContext();

    return (
        <Snackbar
            open={context.isOpen}
            autoHideDuration={3000}
            onClose={context.close}
        >
            <Alert
                onClose={context.close}
                severity={context.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {context.message}
            </Alert>
        </Snackbar>
    );
}