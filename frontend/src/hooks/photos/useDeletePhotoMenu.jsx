import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../Constants.jsx";

export default function useDeletePhotoMenu(onSuccess, onError) {
    const [menuContext, setMenuContext] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const open = (event, photo) => {
        event.preventDefault();
        setSelectedPhoto(photo);
        setMenuContext(
            menuContext === null
                ? {
                    mouseX: event.clientX + 12,
                    mouseY: event.clientY,
                }
                : null,
        );
    };

    const close = () => {
        setMenuContext(null);
        setSelectedPhoto(null);
    };

    const deleteImage = () => {
        if (selectedPhoto) {
            axios
                .delete(`${API_URL}/photos/${selectedPhoto}`)
                .then((res) => {
                    if (res.status === 200) {
                        onSuccess();
                    } else {
                        onError();
                    }
                });
        }
        close();
    };

    return {
        menuContext,
        open,
        close,
        deleteImage,
    };
}