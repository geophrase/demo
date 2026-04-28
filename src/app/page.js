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
import tonedMilkImg from '@/assets/toned-milk.png';
import wheatFlourImg from '@/assets/wheat-flour.png';

export default function Home() {
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
          <Card sx={{ pb: 2 }}>
            <Image
                src={tonedMilkImg}
                height={160}
                alt="Toned Milk 1L"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography>Toned Milk 1L</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>₹40</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
                Add
              </Button>
            </CardActions>
          </Card>
          <Card>
            <Image
                src={wheatFlourImg}
                height={160}
                alt="Wheat Flour 5kg"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography>Wheat Flour 5kg</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>₹200</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
                Add
              </Button>
            </CardActions>
          </Card>
        </Stack>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" startIcon={<ShoppingCartIcon />}>
            Go to cart
          </Button>
        </Box>
      </Box>
  );
}
