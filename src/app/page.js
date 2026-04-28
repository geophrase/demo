'use client';

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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import tonedMilkImg from '@/assets/toned-milk.png';
import wheatFlourImg from '@/assets/wheat-flour.png';
import {useState} from "react";


const shoppingItems = [
  {name: 'Toned Milk 1L', price: 40, image: tonedMilkImg},
  {name: 'Wheat Flour 5kg', price: 200, image: wheatFlourImg}
];


export default function Home() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = index => {
    if (!cartItems.includes(index)) {
      setCartItems([...cartItems, index]);
    } else {
      setCartItems(cartItems.filter(item => item !== index));
    }
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Demo Store
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
          {shoppingItems.map((item, index) => <Card sx={{ pb: 2 }} key={index}>
            <Image
                src={item.image}
                height={160}
                alt={item.name}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography>{item.name}</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>₹{item.price}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                  variant="outlined"
                  startIcon={cartItems.includes(index) ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
                  onClick={() => addToCart(index)}
              >
                {cartItems.includes(index) ? 'Remove' : 'Add'}
              </Button>
            </CardActions>
          </Card>)}
        </Stack>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
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
