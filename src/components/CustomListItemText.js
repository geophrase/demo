import ListItemText from '@mui/material/ListItemText';

export default function CustomListItemText({ label, value }) {
    return (
        <ListItemText
            primary={label}
            secondary={value}
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
}
