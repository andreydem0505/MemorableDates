import {Menu, MenuItem} from "@mui/material";
import * as React from "react";
import {useAppContext} from "../../AppContextProvider.jsx";

export default function PhotoDeleteMenu() {
    const context = useAppContext();

    return <Menu
        open={context.menuContext !== null}
        autoFocus={false}
        onClose={context.close}
        anchorReference="anchorPosition"
        anchorPosition={
            context.menuContext !== null
                ? { top: context.menuContext.mouseY, left: context.menuContext.mouseX }
                : undefined
        }
    >
        <MenuItem onClick={context.deleteImage}>
            Delete
        </MenuItem>
    </Menu>
}