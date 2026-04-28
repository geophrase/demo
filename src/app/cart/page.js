'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image src={item.image} width={80} height={80} alt={item.name} />
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Price: ₹{item.price}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
