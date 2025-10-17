import useDialog from "./useDialog.jsx";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";

export default function useMarkDeleteDialog(markId, onSuccess, onError) {
    const dialog = useDialog();

    const submitDialog = () => {
        axios
            .delete(`${API_URL}/marks/${markId}`)
            .then((res) => {
                if (res.status === 200) {
                    onSuccess();
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