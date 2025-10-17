import useDialog from "./useDialog.jsx";
import {useState} from "react";
import {API_URL} from "../../Constants.jsx";
import axios from "axios";

export default function useMarkAddDialog(eventId, onSuccess, onError) {
    const dialog = useDialog();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState(null);

    const resetForm = () => {
        setName("");
        setDescription("");
        setPlace("");
        setDate(null);
    };

    const submitDialog = () => {
        const body = {
            eventId: eventId,
            name: name,
            description: description,
            place: place,
            date: date.format('DD.MM.YYYY')
        };

        axios
            .post(`${API_URL}/marks`, body)
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
        place,
        setPlace,
        date,
        setDate,
        submitDialog
    };
}