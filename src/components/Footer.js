import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from "@mui/material/Typography";

const REPO_URL = 'https://github.com/geophrase/demo';
const SITE_URL = 'https://geophrase.com';

const linkSx = { display: 'inline-flex', alignItems: 'center', gap: 0.75 };

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 12,
                py: 2,
                display: 'flex',
                justifyContent: 'center',
                color: 'text.secondary'
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 3 }}
                sx={{ alignItems: 'center' }}
            >
                <Link
                    href={SITE_URL}
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                    sx={linkSx}
                >
                    <LanguageIcon fontSize="small" />
                    <Typography>geophrase.com</Typography>
                </Link>
                <Link
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                    sx={linkSx}
                >
                    <GitHubIcon fontSize="small" />
                    <Typography>View source on GitHub</Typography>
                </Link>
            </Stack>
        </Box>
    );
}
