'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      component={Link}
                      href="/"
                  >
                      <ArrowBackIosIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Review Your Order
                  </Typography>
                  <Button color="inherit">Login</Button>
              </Toolbar>
          </AppBar>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              {cartItems.length === 0 ? <>
                  <Typography>Your cart is empty.</Typography>
                  <Button
                      component={Link}
                      href="/"
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<ShoppingCartIcon />}
                  >Go back to shopping</Button>
              </> : <>
              {cartItems.map(item => (
                  <Card sx={{ minWidth: '90%' }} key={item.id}>
                      <CardContent>
                          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                              <Image src={item.image} height={64} alt={item.name} />
                              <Stack>
                                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                      Word of the Day
                                  </Typography>
                                  <Typography variant="h5" component="div">
                                      dfdf
                                  </Typography>
                              </Stack>
                              <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<RemoveShoppingCartIcon />}
                              >Remove</Button>
                          </Stack>
                      </CardContent>
                  </Card>
              ))}
              </>}
          </Box>
      </Box>
  );
}
