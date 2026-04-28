'use client';

import Typography from '@mui/material/Typography';
import { useGeophrase } from '@geophrase/react';
import {useContext, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Link from "next/link";
import {CartContext} from "@/context/CartContext";
import {useRouter} from "next/navigation";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CustomListItemText from "@/components/CustomListItemText";


export default function Checkout() {
    const [address, setAddress] = useState(null);
    const { cartItems } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const { open } = useGeophrase({
        key: 'YOUR_API_KEY',
        phone: typeof window !== 'undefined' ? localStorage.getItem("loginPhone") : null,
        onSuccess: result => {
            setAddress(result);
            localStorage.setItem("loginPhone", result.verified_account_mobile_num);
            setIsLoggedIn(true);
        },
        onClose:  () => router.push('/cart')
    });

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/');
        } else {
            open();
        }
    }, [cartItems.length, open, router]);

    const logout = () => {
        localStorage.removeItem("loginPhone");
        setIsLoggedIn(false);
    }

    if (!address) {
        return null;
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        component={Link}
                        href="/cart"
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Select Address
                    </Typography>
                    {isLoggedIn ? <Button
                        color="inherit"
                        onClick={logout}
                    >
                        Logout
                    </Button> : <Button
                        color="inherit"
                        component={Link}
                        href="/login"
                    >
                        Login
                    </Button>}
                </Toolbar>
            </AppBar>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2}}>
                <Typography>Successfully received address</Typography>
                <List dense>
                    {Object.entries(address).map(([key, value]) => (
                        <ListItem key={key}>
                            <CustomListItemText label={key} value={value} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 4 }}
                >
                    Proceed to make payment
                </Button>
            </Box>
        </Box>
    )
}
