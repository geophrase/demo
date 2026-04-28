'use client';

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from 'next/image'
import {useState} from "react";
import { useRouter } from 'next/navigation';
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import indiaFlagImg from '@/assets/india-flag.png';

export default function Login() {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');

    const callApi = async mobileNum => {
        localStorage.setItem("loginPhone", mobileNum);
        router.back();
    }

    const handleChange = async e => {
        let text = e.target.value;

        text = text.replace(/\D/g, '');

        if (text.length === 0) {
            setPhoneNumber(text);
            return;
        } else if (text.length > 10) {
            if (phoneNumber.length === 11) {
                return;
            }
            text = text.slice(text.length - 10);
        }

        let new_text = '';
        for (let i = 0; i < text.length; i++) {
            new_text += text[i];
            if (i === 4 && i !== text.length - 1) {
                new_text += ' ';
            }
        }
        setPhoneNumber(new_text);
        if (text.length === 10 && parseInt(text[0], 10) >= 6) {
            await callApi(text);
        }
    };

    const handleSubmit = async () => {
        const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
        if (cleanPhoneNumber.length !== 10 || (cleanPhoneNumber && parseInt(cleanPhoneNumber[0], 10) < 6)) {
            return;
        }
        await callApi(cleanPhoneNumber);
    }

    return (
        <Stack
            direction="column"
            sx={{width: 1, height: '100dvh', position: 'relative', justifyContent: "center", alignItems: "center" }}
        >
            <AppBar position='sticky' color="transparent" elevation={0} className="safe-padding-top">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => router.back()}
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{flexGrow: 4}}/>
            <CallOutlinedIcon sx={{fontSize: 60}}/>
            <Box sx={{flexGrow: 1}}/>
            <Typography variant="h5" gutterBottom>
                Your mobile
            </Typography>
            <Box sx={{flexGrow: 1}}/>
            <Typography variant="subtitle1" gutterBottom>Please enter your 10 digit mobile number.</Typography>
            <Box sx={{flexGrow: 1}}/>
            <Divider sx={{width: isMd ? 400 : '80vw'}}/>
            <Box sx={{flexGrow: 1}}/>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Image
                    src={indiaFlagImg}
                    width={24}
                    height={16}
                    alt="Picture of Indian Flag"
                />
                <Typography variant="body1" gutterBottom>
                    +91
                </Typography>
                <TextField
                    sx={{ width: 120 }}
                    variant="standard"
                    placeholder="00000 00000"
                    autoFocus
                    value={phoneNumber}
                    onChange={handleChange}
                    autoComplete="tel"
                    type="tel"
                    slotProps={{
                        htmlInput: {
                            inputMode: 'numeric',
                        }
                    }}
                />
            </Stack>
            <Box sx={{flexGrow: 1}}/>
            <Divider sx={{width: isMd ? 400 : '80vw'}}/>
            <Box sx={{flexGrow: 2}}/>
            <Button
                variant="contained"
                sx={{width: isMd ? 400 : '80vw'}}
                disabled={phoneNumber.length !== 11 || parseInt(phoneNumber[0], 10) < 6}
                onClick={handleSubmit}
            >Continue</Button>
            <Box sx={{flexGrow: 6}}/>
        </Stack>
    );
}
