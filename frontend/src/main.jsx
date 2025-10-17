import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from "@mui/material";
import * as React from 'react';

createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <CssBaseline />
        <App />
    </React.Fragment>
)
