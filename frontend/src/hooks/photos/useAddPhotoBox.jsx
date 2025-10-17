import axios from "axios";
import {useState} from "react";

export default function useAddPhotoBox(url, onSuccess, onError) {
    const [selectedImage, setSelectedImage] = useState(null);

    const uploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const sendImage = () => {
        const body = {
            file: selectedImage
        };

        setSelectedImage(null);

        axios
            .post(url, body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    onSuccess();
                } else {
                    onError();
                }
            });
    }

    return {
        selectedImage,
        uploadImage,
        sendImage,
    };
}