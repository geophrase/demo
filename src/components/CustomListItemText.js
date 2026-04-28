import ListItemText from "@mui/material/ListItemText";
import * as React from "react";


export default function CustomListItemText (props) {
    return (
        <ListItemText
            secondary={props.value}
            primary={props.label}
            slotProps={{
                primary: {
                    sx: { color: 'text.secondary' },
                    variant: 'body2',
                },
                secondary: {
                    sx: { color: 'text.primary' },
                    variant: 'body1',
                },
            }}
        />
    );
};
