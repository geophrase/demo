'use client';

import {useContext, useEffect, useState} from 'react';
import {CartContext} from '@/context/CartContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Cart() {
    const { cartItems, toggleCartItem } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    useEffect(() => {
        async function checkIfLoggedIn() {
            const loginPhone = localStorage.getItem("loginPhone");
            if (loginPhone) {
                setIsLoggedIn(true);
            }
        }

        checkIfLoggedIn().then(() => {
        });
    }, []);

    const logout = () => {
        localStorage.removeItem("loginPhone");
        setIsLoggedIn(false);
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
                        href="/"
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Review Your Order
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
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {cartItems.length === 0 ? <>
                    <Typography sx={{mt: 4}}>Your cart is empty.</Typography>
                    <Button
                        component={Link}
                        href="/"
                        variant="contained"
                        sx={{mt: 2}}
                        startIcon={<ShoppingCartIcon/>}
                    >Go back to shopping</Button>
                </> : <>
                    {cartItems.map(item => (
                        <Card sx={{minWidth: isMd ? '40%' : '95%', mt: 1, border: 0.5, borderColor: '#cccccc'}} key={item.id}
                              elevation={0}>
                            <CardContent>
                                <Stack direction="row" sx={{alignItems: "center", justifyContent: "space-between"}}>
                                    <Image src={item.image} height={64} alt={item.name}/>
                                    <Stack>
                                        <Typography variant="body2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Price: ₹{item.price}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Quantity: 1
                                        </Typography>
                                    </Stack>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<RemoveShoppingCartIcon/>}
                                        onClick={() => toggleCartItem(item)}
                                    >Remove</Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                    <Stack direction="row" sx={{mt: 4, alignItems: 'center'}}>
                        <Typography>
                            Total amount for {cartItems.length} item{cartItems.length > 0 ? 's' : ''}:&nbsp;
                        </Typography>
                        <Typography variant="h6">
                            ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
                        </Typography>
                    </Stack>
                        <Button
                            component={Link}
                            href="/checkout"
                            variant="contained"
                            sx={{ mt: 4 }}
                        >
                            Select address
                        </Button>
                </>}
            </Box>
        </Box>
    );
}
