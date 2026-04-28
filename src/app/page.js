'use client';

import {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Link from 'next/link';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {shoppingItems} from '@/constants/constants';
import {CartContext} from '@/context/CartContext';

export default function Home() {
    const {cartItems, toggleCartItem} = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isItemInCart = (item) => cartItems.some((i) => i.id === item.id);

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
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Demo Store
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

            <Stack direction="row" spacing={2} sx={{mt: 4, justifyContent: 'center'}}>
                {shoppingItems.map((item) => (
                    <Card sx={{pb: 2}} key={item.id}>
                        <Image src={item.image} height={160} alt={item.name}/>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography>{item.name}</Typography>
                            <Typography sx={{fontWeight: 'bold'}}>₹{item.price}</Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center'}}>
                            <Button
                                variant="outlined"
                                startIcon={isItemInCart(item) ? <RemoveShoppingCartIcon/> : <AddShoppingCartIcon/>}
                                onClick={() => toggleCartItem(item)}
                            >
                                {isItemInCart(item) ? 'Remove' : 'Add'}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>

            <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                <Button
                    component={Link}
                    href="/cart"
                    variant="contained"
                    startIcon={<ShoppingCartIcon/>}
                    disabled={cartItems.length === 0}
                >
                    Go to cart ({cartItems.length})
                </Button>
            </Box>
        </Box>
    );
}
