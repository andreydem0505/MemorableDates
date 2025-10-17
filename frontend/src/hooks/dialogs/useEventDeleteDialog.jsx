import useDialog from "./useDialog.jsx";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";

export default function useEventDeleteDialog(eventId, navigate, onError) {
    const dialog = useDialog();

    const submitDialog = () => {
        axios
            .delete(`${API_URL}/events/${eventId}`)
            .then((res) => {
                if (res.status === 200) {
                    navigate('/');
                } else {
                    onError();
                }
            });
    };

    return {
        dialog,
        submitDialog,
    };
}