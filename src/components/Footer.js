import React from 'react';
import 
{
  //  Container,
   Grid,
   Typography,
}
from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LogoTelkomWhite from '../static/image/logo-telkom-white.png';


const useStyles = makeStyles((theme) => ({
    footer: {
      background: '#303030',
      color: 'white',
      border: 0,
      borderRadius: 3,
      width : '100%',
      boxShadow: 'black',
      // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      borderTop: `1px solid ${theme.palette.divider}`,
      // marginTop: theme.spacing(8),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontFamily: 'Calibri',
      fontStyle: 'italic',
      fontSize: '8px',
      marginBottom : 0,
      
      // [theme.breakpoints.up('sm')]: {
      //     paddingTop: theme.spacing(6),
      //     paddingBottom: theme.spacing(6),
      //     },
    },
  }));


function Copyright() {
    return (
          <Typography 
            align='right'
            // variant="body2" 
            // color="inherit" 
            // align="right"
            // fontFamily= 'Monospace'
            // fontStyle= 'normal'
            // fontDisplay= 'swap'
            // fontWeight= "400"
            // fontWeight="fontWeightLight"
            // fontStyle= 'italic'
            
            >
            {'Copyright '} {new Date().getFullYear()}
            {'.'}
            <br />
            PT. Telekomunikasi Indonesia (Persero), Tbk<br />
            Telkom Regional V Jatim Balinusra<br />
            Digital Service & WiFi<br />           
          </Typography>
    );
  }
  
  
export default function Footer() {
const classes = useStyles();

return (
  <Grid 
    container 
    // xs={12} 
    className={classes.footer}
    direction="row"
    justify="space-between"
    alignItems="center"
    >
    <Grid item xs={6} style={{paddingLeft:"10px"}}> 
      <img 
        src={LogoTelkomWhite} 
        alt="Footer Logo" 
        height="80px"
        // paddingLeft="100px"
      />
    </Grid>
    <Grid item xs={6}>
      <Copyright />
    </Grid>
  </Grid>
    );
}