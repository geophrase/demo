'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Header from '@/components/Header';

export default function Cart() {
    const { cartItems, toggleCartItem } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const itemLabel = cartItems.length === 1 ? 'item' : 'items';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header title="Review Your Order" backHref="/" />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {cartItems.length === 0 ? (
                    <>
                        <Typography sx={{ mt: 4 }}>Your cart is empty.</Typography>
                        <Button
                            component={Link}
                            href="/"
                            variant="contained"
                            sx={{ mt: 2 }}
                            startIcon={<ShoppingCartIcon />}
                        >
                            Go back to shopping
                        </Button>
                    </>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Card
                                key={item.id}
                                elevation={0}
                                sx={{
                                    width: { xs: '95%', md: '40%' },
                                    mt: 1,
                                    border: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                <CardContent>
                                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Image src={item.image} height={64} alt={item.name} />
                                        <Stack>
                                            <Typography variant="body2">{item.name}</Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Price: ₹{item.price}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Quantity: 1
                                            </Typography>
                                        </Stack>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<RemoveShoppingCartIcon />}
                                            onClick={() => toggleCartItem(item)}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}

                        <Stack direction="row" sx={{ mt: 4, alignItems: 'center' }}>
                            <Typography>
                                Total amount for {cartItems.length} {itemLabel}:&nbsp;
                            </Typography>
                            <Typography variant="h6">₹{total}</Typography>
                        </Stack>

                        <Button
                            component={Link}
                            href="/checkout"
                            variant="contained"
                            sx={{ mt: 4 }}
                        >
                            Select address
                        </Button>

                        <Alert severity="info" sx={{ mt: 2, mx: 2 }}>Clicking above button will trigger the Geophrase Connect widget using the Geophrase SDK.</Alert>
                    </>
                )}
            </Box>
        </Box>
    );
}
