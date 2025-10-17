import useDialog from "./useDialog.jsx";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";

export default function useEventAddDialog(onSuccess, onError) {
    const dialog = useDialog();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);

    const resetForm = () => {
        setName("");
        setDescription("");
        setDate(null);
    };

    const submitDialog = () => {
        const body = {
            name: name,
            description: description,
            date: date.format('DD.MM.YYYY')
        };

        axios
            .post(`${API_URL}/events`, body)
            .then((res) => {
                if (res.status === 200) {
                    dialog.close();
                    resetForm();
                    onSuccess();
                } else {
                    onError();
                }
            });
    };

    return {
        dialog,
        name,
        setName,
        description,
        setDescription,
        date,
        setDate,
        submitDialog
    };
}