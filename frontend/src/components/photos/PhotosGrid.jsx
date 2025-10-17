import {Grid} from "@mui/material";
import {API_URL} from "../../Constants.jsx";
import * as React from "react";

export default function PhotosGrid(
    {
        photos,
        openContextMenu
    }) {
    return <Grid container spacing={4}>
        {photos.map((photo) => (
            <Grid size={6} sx={{overflow: 'hidden', height: "400px"}} key={photo}>
                <img
                    style={{width: '100%', height: '100%', objectFit: 'cover', cursor: 'context-menu'}}
                    src={`${API_URL}/photos/${photo}`}
                    alt="image"
                    loading="lazy"
                    onContextMenu={(event) => openContextMenu(event, photo)}
                />
            </Grid>
        ))}
    </Grid>
}