import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";
import useDialog from "./useDialog.jsx";

export default function useMarkEditDialog(markId, onSuccess, onError) {
    const dialog = useDialog();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState(null);

    const submitDialog = () => {
        const body = {
            id: markId,
            name: name,
            description: description,
            place: place,
            date: date.format('DD.MM.YYYY')
        };

        axios
            .put(`${API_URL}/marks/${markId}`, body)
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
        place,
        setPlace,
        date,
        setDate,
        submitDialog
    };
}