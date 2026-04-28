'use client';

import { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
import { shoppingItems } from '@/constants/constants';
import { CartContext } from '@/context/CartContext';
import Header from '@/components/Header';

export default function Home() {
    const { cartItems, toggleCartItem } = useContext(CartContext);

    const isInCart = (item) => cartItems.some((i) => i.id === item.id);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header title="Demo Store" />

            <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
                {shoppingItems.map((item) => (
                    <Card sx={{ pb: 2 }} key={item.id}>
                        <Image src={item.image} height={160} alt={item.name} />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography>{item.name}</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>₹{item.price}</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                startIcon={isInCart(item) ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
                                onClick={() => toggleCartItem(item)}
                            >
                                {isInCart(item) ? 'Remove' : 'Add'}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                    component={Link}
                    href="/cart"
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    disabled={cartItems.length === 0}
                >
                    Go to cart ({cartItems.length})
                </Button>
            </Box>
        </Box>
    );
}
