import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © Telkom Regional V '}
        {/* <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '} */}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }