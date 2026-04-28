'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import indiaFlagImg from '@/assets/india-flag.png';
import { useAuth } from '@/hooks/useAuth';

const formatPhone = (digits) =>
    digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;

const isValidIndianMobile = (digits) =>
    digits.length === 10 && /^[6-9]/.test(digits);

const fieldWidth = { xs: '80vw', md: 400 };

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');

    const digits = phoneNumber.replace(/\s/g, '');
    const canSubmit = isValidIndianMobile(digits);

    const handleChange = (e) => {
        const next = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(formatPhone(next));
    };

    const handleSubmit = () => {
        if (!canSubmit) return;
        login(digits);
        router.back();
    };

    return (
        <Stack
            direction="column"
            sx={{ width: 1, height: '100dvh', justifyContent: 'center', alignItems: 'center' }}
        >
            <AppBar position="sticky" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        sx={{ mr: 2 }}
                        onClick={() => router.back()}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 4 }} />
            <CallOutlinedIcon sx={{ fontSize: 60 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h5" gutterBottom>Your mobile</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
                Please enter your 10 digit mobile number.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{ width: fieldWidth }} />
            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Image src={indiaFlagImg} width={24} height={16} alt="Indian flag" />
                <Typography variant="body1">+91</Typography>
                <TextField
                    sx={{ width: 120 }}
                    variant="standard"
                    placeholder="00000 00000"
                    autoFocus
                    value={phoneNumber}
                    onChange={handleChange}
                    autoComplete="tel"
                    type="tel"
                    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                />
            </Stack>

            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{ width: fieldWidth }} />
            <Box sx={{ flexGrow: 2 }} />

            <Button
                variant="contained"
                sx={{ width: fieldWidth }}
                disabled={!canSubmit}
                onClick={handleSubmit}
            >
                Continue
            </Button>
            <Box sx={{ flexGrow: 6 }} />
        </Stack>
    );
}
