'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGeophrase } from '@geophrase/react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CartContext } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { GEOPHRASE_API_KEY } from '@/constants/constants';
import CustomListItemText from '@/components/CustomListItemText';
import Header from '@/components/Header';

export default function Checkout() {
    const router = useRouter();
    const { cartItems } = useContext(CartContext);
    const { phone, login } = useAuth();
    const [address, setAddress] = useState(null);

    const { open } = useGeophrase({
        key: GEOPHRASE_API_KEY,
        theme: 'system',
        phone,
        onSuccess: (result) => {
            setAddress(result);
            login(result.verified_account_mobile_num);
        },
        onClose: () => router.push('/cart'),
    });

    useEffect(() => {
        if (!GEOPHRASE_API_KEY) return;
        if (cartItems.length === 0) {
            router.push('/');
        } else {
            open();
        }
    }, [cartItems.length, open, router]);

    if (!GEOPHRASE_API_KEY) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>Missing API key</Typography>
                <Typography>
                    Set <code>NEXT_PUBLIC_GEOPHRASE_API_KEY</code> in your <code>.env</code> file. See README for setup.
                </Typography>
            </Box>
        );
    }

    if (!address) {
        return <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }} />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header title="Select Address" backHref="/cart" />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Typography>Successfully received address</Typography>
                <List dense>
                    {Object.entries(address).map(([key, value]) => (
                        <ListItem key={key}>
                            <CustomListItemText label={key} value={value} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" sx={{ mt: 2 }}>
                    Proceed to make payment
                </Button>
            </Box>
        </Box>
    );
}
