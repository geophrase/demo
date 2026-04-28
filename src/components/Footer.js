import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from "@mui/material/Typography";

const REPO_URL = 'https://github.com/geophrase/demo';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 16,
                py: 2,
                display: 'flex',
                justifyContent: 'center',
                color: 'text.secondary'
            }}
        >
            <Link
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="inherit"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
            >
                <GitHubIcon fontSize="small" />
                <Typography sx={{ mt: 0.3 }}>View source on GitHub</Typography>
            </Link>
        </Box>
    );
}
