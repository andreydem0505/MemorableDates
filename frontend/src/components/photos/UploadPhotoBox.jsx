import {Box, Button} from "@mui/material";
import * as React from "react";
import {useAppContext} from "../../AppContextProvider.jsx";

export default function UploadPhotoBox() {
    const context = useAppContext();

    return <Box sx={{marginTop: "1rem"}}>
        <Button variant="contained" component="label">
            {context.selectedImage ? context.selectedImage.name : "Select image"}
            <input type="file" accept="image/*" onChange={context.uploadImage} hidden/>
        </Button>
        <Button variant="contained" sx={{marginX: 1}} disabled={!context.selectedImage} onClick={context.sendImage}>
            Add image
        </Button>
    </Box>
}