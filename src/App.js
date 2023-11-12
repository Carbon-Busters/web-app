import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SiteInfoForm from './pages/SiteInfoForm';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h4" color="white" noWrap>
            RADIANT
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            <b>Bifacial Solar Quote</b>
          </Typography>
          <div style={{ marginBottom: '20px' }}></div>
          <SiteInfoForm/>
        </Paper>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © Radiant '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </React.Fragment>
  );
}