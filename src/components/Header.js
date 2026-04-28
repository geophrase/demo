'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header({ title, backHref }) {
    const { phone, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                {backHref && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        sx={{ mr: 2 }}
                        component={Link}
                        href={backHref}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {phone ? (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                ) : (
                    <Button color="inherit" component={Link} href="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
