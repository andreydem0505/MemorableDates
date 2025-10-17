import * as React from 'react';
import {useEffect, useState, useCallback} from 'react'
import axios from "axios";
import {API_URL} from "../Constants.jsx";
import {Box, Collapse, Container, Fab, Link, List, ListItemButton, Stack} from "@mui/material";
import {ExpandMore, ExpandLess} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EventUpsertDialog from "./dialogs/EventUpsertDialog.jsx";
import ActionAlert from "./ActionAlert.jsx";
import useEventAddDialog from "../hooks/dialogs/useEventAddDialog.jsx";
import useAlert from "../hooks/useAlert.jsx";
import {AppContextProvider} from "../AppContextProvider.jsx";
import DatesFilter from "./DatesFilter.jsx";
import PageController from "./PageController.jsx";
import usePageController from "../hooks/usePageController.jsx";

export default function AllEvents() {
    const [totalDates, setTotalDates] = useState(0);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [resultList, setResultList] = useState([]);
    const [expanded, setExpanded] = useState(new Set());

    const pageController = usePageController();

    const fetchData = useCallback(() => {
        let url = `${API_URL}/dates?page=${pageController.page}`;
        if (fromDate) {
            url += `&fromDate=${fromDate.format('DD.MM.YYYY')}`;
        }
        if (toDate) {
            url += `&toDate=${toDate.format('DD.MM.YYYY')}`;
        }
        axios
            .get(url)
            .then((res) => {
                setResultList(res.data.result);
                pageController.setTotalPages(res.data.totalPages);
                setTotalDates(res.data.totalDates);
            });
    }, [pageController.page, fromDate, toDate]);

    useEffect(() => {
        fetchData();
    }, [pageController.page]);

    const alert = useAlert();

    const handleAddDialogSuccess = () => {
        alert.openSuccess('Event was added');
        fetchData();
    };

    const handleAddDialogError = () => {
        alert.openError('Error adding the event');
    };

    const eventAddDialog = useEventAddDialog(handleAddDialogSuccess, handleAddDialogError);

    const handleExpandClick = (date) => {
        setExpanded(prev => {
            const next = new Set(prev);
            if (next.has(date)) {
                next.delete(date);
            } else {
                next.add(date);
            }
            return next;
        });
    };

    const handleAddClick = () => {
        eventAddDialog.setName("");
        eventAddDialog.setDescription("");
        eventAddDialog.setDate(null);
        eventAddDialog.dialog.open();
    };

    const handleFilterSubmit = () => {
        const prevPage = pageController.page;
        pageController.setPage(1);
        setExpanded(new Set());
        if (prevPage === 1) {
            fetchData();
        }
    };

    return (
        <Container maxWidth="md">
            <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "baseline"}}>
                <h1>Memorable Dates</h1>
                <Fab size="small" color="primary" onClick={handleAddClick} aria-label="add">
                    <AddIcon />
                </Fab>
            </Stack>

            <DatesFilter fromDate={fromDate} 
                         setFromDate={setFromDate} 
                         toDate={toDate} 
                         setToDate={setToDate} 
                         onSubmit={handleFilterSubmit} />

            <h2>Total dates: {totalDates}</h2>
            {totalDates > 0 &&
                <List>
                {resultList.map(resultRow => (
                    <Box key={resultRow.date}>
                        <ListItemButton onClick={() => handleExpandClick(resultRow.date)}>
                            {expanded.has(resultRow.date) ? <ExpandLess /> : <ExpandMore />}
                            {resultRow.date}
                        </ListItemButton>

                        <Collapse in={expanded.has(resultRow.date)} unmountOnExit>
                            <List>
                                {resultRow.events.map(event => (
                                    <ListItemButton component={Link}
                                                    to={`/events/${event.id}`}
                                                    sx={{ paddingLeft: "2.5rem" }}
                                                    key={event.id}>
                                        {event.name}
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
                </List>
            }

            {pageController.totalPages > 1 &&
                <AppContextProvider value={pageController}>
                    <PageController />
                </AppContextProvider>
            }

            <AppContextProvider value={eventAddDialog}>
                <EventUpsertDialog dialogTitle="Add new event" />
            </AppContextProvider>

            <AppContextProvider value={alert}>
                <ActionAlert/>
            </AppContextProvider>
        </Container>
    )
}