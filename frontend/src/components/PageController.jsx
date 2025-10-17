import {IconButton, Stack} from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight'
import {useAppContext} from "../AppContextProvider.jsx";

export default function PageController() {
    const {page, setPage, totalPages} = useAppContext();

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return <Stack direction="row" spacing={1} sx={{justifyContent: "center", alignItems: "center"}}>
        <IconButton onClick={handlePrevPage} disabled={page === 1}>
            <ChevronLeft />
        </IconButton>
        <span>{page} of {totalPages}</span>
        <IconButton onClick={handleNextPage} disabled={page === totalPages}>
            <ChevronRight />
        </IconButton>
    </Stack>
}