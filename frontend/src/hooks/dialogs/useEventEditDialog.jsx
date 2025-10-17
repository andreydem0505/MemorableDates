import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";
import useDialog from "./useDialog.jsx";

export default function useEventEditDialog(eventId, onSuccess, onError) {
    const dialog = useDialog();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);

    const submitDialog = () => {
        const body = {
            id: eventId,
            name: name,
            description: description,
            date: date.format('DD.MM.YYYY')
        };

        axios
            .put(`${API_URL}/events`, body)
            .then((res) => {
                if (res.status === 200) {
                    dialog.close();
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