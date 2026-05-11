"use client";

import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function CodeBlock({codeString, language}) {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const [buttonText, setButtonText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString)
            .then(() => {
                setButtonText('Copied');
                setTimeout(() => {
                    setButtonText('Copy');
                }, 2500);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                setButtonText('Error');
            });
    };

    return (
        <Box sx={{ position: 'relative', '& span': { textDecoration: 'none !important' } }}>
            {isMd && <Button
                onClick={handleCopy}
                variant="outlined"
                size="small"
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: 'rgb(202, 208, 216)',
                    borderColor: 'rgba(48, 56, 64, 0.5)',
                    paddingTop: '4px',
                    paddingBlock: '4px',
                    '&:hover': {
                        borderColor: 'rgb(79, 92, 105)',
                    },
                }}
            >{buttonText}</Button>}

            <SyntaxHighlighter
                language={language}
                style={atomDark}
                customStyle={{
                    borderRadius: 12,
                    fontSize: 13,
                }}
            >
                {codeString}
            </SyntaxHighlighter>
        </Box>
    );
};
