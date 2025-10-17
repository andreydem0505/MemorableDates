import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import {useAppContext} from "../../AppContextProvider.jsx";
import {useCallback, useState} from "react";

export default function EventUpsertDialog({dialogTitle}) {
    const context = useAppContext();

    const [nameError, setNameError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);

    const changeName = useCallback((value) => {
        if (value.length > 512) {
            return;
        }
        if (value.length === 0) {
            setNameError("Name can't be empty");
        } else {
            setNameError(null);
        }
        context.setName(value);
    }, [context]);

    const changeDescription = useCallback((value) => {
        if (value.length > 2048) {
            return;
        }
        if (value.length === 0) {
            setDescriptionError("Description can't be empty");
        } else {
            setDescriptionError(null);
        }
        context.setDescription(value);
    }, [context]);

    const isSubmitEnabled =
        nameError === null &&
        descriptionError === null &&
        context.date !== null;

    return <Dialog open={context.dialog.isOpen} onClose={context.dialog.close}>
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent sx={{width: "600px"}}>
            <TextField fullWidth name="name"
                       label="Name"
                       variant="filled"
                       margin="normal"
                       value={context.name}
                       onChange={(e) => changeName(e.target.value)}
                       error={nameError !== null}
                       helperText={nameError}
                       required>
            </TextField>
            <TextField fullWidth name="description"
                       label="Description"
                       variant="filled"
                       margin="normal"
                       value={context.description}
                       onChange={(e) => changeDescription(e.target.value)}
                       error={descriptionError !== null}
                       helperText={descriptionError}
                       required
                       multiline>
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date"
                            value={context.date}
                            onChange={(newValue) => context.setDate(newValue)}
                            sx={{width: "100%", marginTop: "1rem"}}
                            format="DD.MM.YYYY"
                            required />
            </LocalizationProvider>
        </DialogContent>

        <DialogActions>
            <Button onClick={context.dialog.close}>Cancel</Button >
            <Button type="submit" disabled={!isSubmitEnabled} onClick={(event) => {
                event.preventDefault();
                context.submitDialog();
            }}>Save</Button >
        </DialogActions>
    </Dialog>
}