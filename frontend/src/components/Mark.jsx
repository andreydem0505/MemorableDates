import {useNavigate, useParams} from "react-router-dom";
import {Box, Container} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../Constants.jsx";
import PageLoading from "./PageLoading.jsx";
import * as React from "react";
import Header from "./Header.jsx";
import Link from "@mui/material/Link";
import useMarkEditDialog from "../hooks/dialogs/useMarkEditDialog.jsx";
import {AppContextProvider} from "../AppContextProvider.jsx";
import MarkUpsertDialog from "./dialogs/MarkUpsertDialog.jsx";
import dayjs from "dayjs";
import useAlert from "../hooks/useAlert.jsx";
import ActionAlert from "./ActionAlert.jsx";
import useDeletePhotoMenu from "../hooks/photos/useDeletePhotoMenu.jsx";
import useAddPhotoBox from "../hooks/photos/useAddPhotoBox.jsx";
import PhotosGrid from "./photos/PhotosGrid.jsx";
import UploadPhotoBox from "./photos/UploadPhotoBox.jsx";
import PhotoDeleteMenu from "./photos/PhotoDeleteMenu.jsx";
import useMarkDeleteDialog from "../hooks/dialogs/useMarkDeleteDialog.jsx";
import DeleteDialog from "./dialogs/DeleteDialog.jsx";

export default function Mark() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [mark, setMark] = useState(null);

    const fetchData = useCallback(() => {
        axios
            .get(`${API_URL}/marks/${id}`)
            .then((res) => {
                setMark(res.data);
            });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const alert = useAlert();

    const handleMarkEditDialogSuccess = () => {
        alert.openSuccess('Mark was edited');
        fetchData();
    };

    const handleMarkEditDialogError = () => {
        alert.openError('Error editing the mark');
    };

    const handleMarkDeleteDialogSuccess = () => {
        navigate(`/events/${mark.eventId}`);
    };

    const handleMarkDeleteDialogError = () => {
        alert.openError('Error deleting the mark');
    };

    const handleAddPhotoBoxError = () => {
        alert.openError('Error adding the photo');
    };

    const handleDeletePhotoMenuError = () => {
        alert.openError('Error deleting the photo');
    };

    const markEditDialog = useMarkEditDialog(id, handleMarkEditDialogSuccess, handleMarkEditDialogError);
    const addPhotoBox = useAddPhotoBox(`${API_URL}/marks/${id}/photos`, fetchData, handleAddPhotoBoxError);
    const deletePhotoMenu = useDeletePhotoMenu(fetchData, handleDeletePhotoMenuError);
    const markDeleteDialog = useMarkDeleteDialog(id, handleMarkDeleteDialogSuccess, handleMarkDeleteDialogError);

    const handleEditButtonClick = () => {
        markEditDialog.setName(mark.name);
        markEditDialog.setDescription(mark.description);
        markEditDialog.setPlace(mark.place);
        markEditDialog.setDate(dayjs(mark.date, 'DD.MM.YYYY', true));
        markEditDialog.dialog.open();
    };

    const handleDeleteButtonClick = () => {
        markDeleteDialog.dialog.open();
    };

    return <Container maxWidth="md">
        {mark === null ?
            <PageLoading/> :
            <Box>
                <Header text={mark.name}
                        onEditClick={handleEditButtonClick}
                        onDeleteClick={handleDeleteButtonClick} />

                <h3>{mark.date} ({mark.place})</h3>

                <PhotosGrid photos={mark.photos} openContextMenu={deletePhotoMenu.open}/>
                <AppContextProvider value={addPhotoBox}>
                    <UploadPhotoBox />
                </AppContextProvider>

                <AppContextProvider value={deletePhotoMenu}>
                    <PhotoDeleteMenu />
                </AppContextProvider>

                <p style={{marginTop: "2rem", whiteSpace: "pre-wrap"}}>{mark.description}</p>
                <Link href={`/events/${mark.eventId}`}>back to event</Link>

                <AppContextProvider value={markEditDialog}>
                    <MarkUpsertDialog dialogTitle="Edit the mark" />
                </AppContextProvider>

                <AppContextProvider value={markDeleteDialog}>
                    <DeleteDialog item="mark"/>
                </AppContextProvider>

                <AppContextProvider value={alert}>
                    <ActionAlert/>
                </AppContextProvider>
            </Box>
        }
    </Container>
}