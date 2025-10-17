import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../Constants.jsx";
import {Box, Container, Fab, Stack, ListItemButton, List} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EventUpsertDialog from "./dialogs/EventUpsertDialog.jsx";
import * as React from "react";
import ActionAlert from "./ActionAlert.jsx";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PageLoading from "./PageLoading.jsx";
import DeleteDialog from "./dialogs/DeleteDialog.jsx";
import useEventEditDialog from "../hooks/dialogs/useEventEditDialog.jsx";
import useEventDeleteDialog from "../hooks/dialogs/useEventDeleteDialog.jsx";
import useAlert from "../hooks/useAlert.jsx";
import useAddPhotoBox from "../hooks/photos/useAddPhotoBox.jsx";
import UploadPhotoBox from "./photos/UploadPhotoBox.jsx";
import useDeletePhotoMenu from "../hooks/photos/useDeletePhotoMenu.jsx";
import PhotosGrid from "./photos/PhotosGrid.jsx";
import PhotoDeleteMenu from "./photos/PhotoDeleteMenu.jsx";
import {AppContextProvider} from "../AppContextProvider.jsx";
import useMarkAddDialog from "../hooks/dialogs/useMarkAddDialog.jsx";
import MarkUpsertDialog from "./dialogs/MarkUpsertDialog.jsx";
import Link from '@mui/material/Link';
import Header from "./Header.jsx";

dayjs.extend(customParseFormat);

export default function Event() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const fetchData = useCallback(() => {
        axios
            .get(`${API_URL}/events/${id}`)
            .then((res) => {
                setEvent(res.data);
            });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const alert = useAlert();

    const handleEditDialogSubmit = () => {
        alert.openSuccess('Event was edited');
        fetchData();
    };

    const handleAddMarkDialogSubmit = () => {
        alert.openSuccess('Mark was added');
        fetchData();
    };

    const handleEventEditDialogError = () => {
        alert.openError('Error editing the event');
    };

    const handleEventDeleteDialogError = () => {
        alert.openError('Error deleting the event');
    };

    const handleMarkAddDialogError = () => {
        alert.openError('Error adding the mark');
    };

    const handleAddPhotoBoxError = () => {
        alert.openError('Error adding the photo');
    };

    const handleDeletePhotoMenuError = () => {
        alert.openError('Error deleting the photo');
    };

    const eventEditDialog = useEventEditDialog(id, handleEditDialogSubmit, handleEventEditDialogError);
    const eventDeleteDialog = useEventDeleteDialog(id, navigate, handleEventDeleteDialogError);
    const addPhotoBox = useAddPhotoBox(`${API_URL}/events/${id}/photos`, fetchData, handleAddPhotoBoxError);
    const deletePhotoMenu = useDeletePhotoMenu(fetchData, handleDeletePhotoMenuError);
    const markAddDialog = useMarkAddDialog(id, handleAddMarkDialogSubmit, handleMarkAddDialogError);

    const handleEditButtonClick = () => {
        eventEditDialog.setName(event.name);
        eventEditDialog.setDescription(event.description);
        eventEditDialog.setDate(dayjs(event.date, 'DD.MM.YYYY', true));
        eventEditDialog.dialog.open();
    };

    const handleDeleteButtonClick = () => {
        eventDeleteDialog.dialog.open();
    };

    const handleAddMarkButtonClick = () => {
        markAddDialog.dialog.open();
    };

    return (
        <Container maxWidth="md">
            {event === null ?
                <PageLoading/> :
                <Box>
                    <Header text={event.name}
                            onEditClick={handleEditButtonClick}
                            onDeleteClick={handleDeleteButtonClick} />

                    <h3>{event.date}</h3>

                    <PhotosGrid photos={event.photos} openContextMenu={deletePhotoMenu.open}/>
                    <AppContextProvider value={addPhotoBox}>
                        <UploadPhotoBox />
                    </AppContextProvider>

                    <AppContextProvider value={deletePhotoMenu}>
                        <PhotoDeleteMenu />
                    </AppContextProvider>

                    <p style={{marginTop: "2rem", whiteSpace: "pre-wrap"}}>{event.description}</p>
                    <Link href="/" >
                        back to main page
                    </Link>

                    <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "baseline"}}>
                        <h3>Marks:</h3>
                        <Fab size="small" color="primary" onClick={handleAddMarkButtonClick} aria-label="add" >
                            <AddIcon />
                        </Fab>
                    </Stack>
                    {event.marks.length === 0 ? <p>No marks yet</p> :
                        <List>
                            {event.marks.map((mark) => (
                                <ListItemButton component={Link}
                                                to={`/marks/${mark.id}`}
                                                key={mark.id}>
                                    {mark.name}
                                </ListItemButton>
                            ))}
                        </List>
                    }

                    <AppContextProvider value={eventEditDialog}>
                        <EventUpsertDialog dialogTitle="Edit the event" />
                    </AppContextProvider>

                    <AppContextProvider value={eventDeleteDialog}>
                        <DeleteDialog item="event"/>
                    </AppContextProvider>

                    <AppContextProvider value={alert}>
                        <ActionAlert />
                    </AppContextProvider>

                    <AppContextProvider value={markAddDialog}>
                        <MarkUpsertDialog dialogTitle="Add new mark" />
                    </AppContextProvider>
                </Box>
            }
        </Container>
    );
}