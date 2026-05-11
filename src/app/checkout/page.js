'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGeophrase } from '@geophrase/react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CartContext } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { GEOPHRASE_API_KEY } from '@/constants/constants';
import Header from '@/components/Header';
import CodeBlock from "@/components/CodeBlock";

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
            login(result.address.verified_mobile_num);
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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mx: 2 }}>
                <Typography>Geophrase Connect widget successfully handed over address to your application.</Typography>

                <Box sx={{ width: "100%" }}>
                    <CodeBlock codeString={JSON.stringify(address, null, 2)} language="JavaScript" />
                </Box>

                <Button variant="contained" sx={{ mt: 4 }}>
                    Proceed to make payment
                </Button>
            </Box>
        </Box>
    );
}
