import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';

export default function BreadCrumbs(props) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        
        {/*Update Home Link to use React Router */}
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/"
        >
          Home
        </Link>

        <Typography sx={{ color: 'text.primary' }}>
          {props.page}
        </Typography>

      </Breadcrumbs>
    </Stack>
  );
}