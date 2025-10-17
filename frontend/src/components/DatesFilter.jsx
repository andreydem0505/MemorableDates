import {Button, Stack} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import * as React from "react";

export default function DatesFilter(
    {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        onSubmit
    }) {
    return <Stack direction="row" spacing={2} sx={{ mb: 4, mt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="From date"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        format="DD.MM.YYYY"
                        slotProps={{
                            field: { clearable: true }
                        }} />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="To date"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        format="DD.MM.YYYY"
                        slotProps={{
                            field: { clearable: true }
                        }} />
        </LocalizationProvider>
        <Button variant="contained" onClick={(event) => {
            event.preventDefault();
            onSubmit();
        }}>Filter</Button >
    </Stack>
}