import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import * as React from "react";
import {useAppContext} from "../../AppContextProvider.jsx";

export default function DeleteDialog({item}) {
    const context = useAppContext();

    return <Dialog open={context.dialog.isOpen} onClose={context.dialog.close}>
        <DialogTitle>Are you sure you want to delete the {item}?</DialogTitle>
        <DialogActions>
            <Button onClick={context.dialog.close}>Cancel</Button >
            <Button color="error" type="submit" onClick={(event) => {
                event.preventDefault();
                context.submitDialog();
            }}>Yes</Button >
        </DialogActions>
    </Dialog>
}