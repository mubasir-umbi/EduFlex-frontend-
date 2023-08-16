import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';



const defaultTheme = createTheme();

export default function Footer() {
    return (
  

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 16,
                    backgroundColor: '#244D61'
                }}
            >
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" >
                          
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {'Copyright © '}
                        <Link color="inherit" href="https://mui.com/">
                            eduflex.com
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </Box>

    );
}