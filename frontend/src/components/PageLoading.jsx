import {Backdrop, CircularProgress} from "@mui/material";
import * as React from "react";

export default function PageLoading() {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}