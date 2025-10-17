import {useState} from "react";

export default function useAlert() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const open = (message) => {
        setMessage(message);
        setIsOpen(true);
    };

    const openSuccess = (message) => {
        open(message);
        setSeverity('success')
    };

    const openError = (message) => {
        open(message);
        setSeverity('error')
    };

    const close = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

    return {
        isOpen,
        openSuccess,
        openError,
        close,
        message,
        severity,
    }
}