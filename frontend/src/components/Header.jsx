import {Fab, Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Header({text, onEditClick, onDeleteClick}) {
    return <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "baseline"}}>
        <h2 style={{width: "80%"}}>{text}</h2>
        <Stack direction="row" spacing={1}>
            <Fab size="small" color="primary" onClick={onEditClick} aria-label="edit" >
                <EditIcon />
            </Fab>
            <Fab size="small" color="error" onClick={onDeleteClick} aria-label="delete" >
                <DeleteIcon />
            </Fab>
        </Stack>
    </Stack>
}