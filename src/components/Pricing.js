import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
    Link,
    useLocation
  } from "react-router-dom";
import { toast } from 'react-toastify';
import LogoWMS from '../static/image/logo.svg';
// import { useParams } from "react-router";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const queryString = require('query-string');

var parsed = queryString.parse(this.props.location.search);
console.log(parsed.param); // replace param with your own 


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
    width : '100%',

    '&:focus, &:hover, &:visited, &:link, &:active' : {
        color: 'inherit',
        textDecoration: 'inherit',
    }
  },
  heroContent: {
    padding: theme.spacing(6, 0, 6),
    // background : 'red',
    width : '100%',
  },
  card : {
    borderStyle:"solid",
    borderColor:"#f44336",
    borderRadius:30,
    direction:"column",
    alignItems:"center",
    justify:"center",
    spacing:0,
  },
  cardHeader: {
    // fontStyle:"bold"
    // borderStyle:"solid",
    // backgroundColor: "#f44336"
      // theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    borderStyle:"solid",
    borderColor:"grey",
    borderTop : 3,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop : "10px",
    paddingTop : "10px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    // marginBottom : "10px",
    // marginBottom: theme.spacing(1),
  },
  cardContent : {
      fontSize : "8px",
    //   '&:hover': {
    //     background: "#f00",
    //     color : 'white',
    // },
  },
  cardButtonSection:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : '20px'
  },
  cardButton: {
      '&:hover': {
          background: "#f00",
          color: 'white',
      },
      backgroundColor: '#f44336',
      color: 'white',
      borderRadius: 30,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      // borderTop: `1px solid ${theme.palette.divider}`,
  },
  
}));

const tiers = [
  {
    id : "1",
    title: 'Paket WMS 20 Mbps',
    subheader : '(Paket Silver)',
    price: 'Rp. 470.000',
    description: [
                'Tanpa Kuota/Batasan penggunaan', 
                'Kecepatan Up-to 20 Mbps(Fiber Optic)', 
                '2 Vas Basic',
                'Perangkat ISP Grade',
            ],
    buttonText: 'Pilih Paket Ini!',
    buttonVariant: 'outlined',
  },
  {
    id : "2",
    title: 'Paket WMS 50 Mbps',
    subheader: '(Paket Gold)',
    price: 'Rp. 950.000',
    description:[
              'Tanpa Kuota/Batasan penggunaan', 
              'Kecepatan Up-to 50 Mbps(Fiber Optic)', 
              '3 Vas Basic',
              'Perangkat ISP Grade',
    ],
    buttonText: 'Pilih Paket Ini!',
    buttonVariant: 'outlined',
  },
  {
    id : "3",
    title: 'Paket WMS 100 Mbps',
    subheader: '(Paket Platinum)',
    price: 'Rp. 1.500.000',
    description: [
            'Tanpa Kuota/Batasan penggunaan', 
            'Kecepatan Up-to 50 Mbps(Fiber Optic)', 
            '3 Vas Basic',
            'Perangkat ISP Grade',
    ],
    buttonText: 'Pilih Paket Ini!',
    buttonVariant: 'contained',
  },
  {
    id : "0",
    title: 'Tidak Sesuai dengan Keinginanmu?',
    subheader : "Konsultasikan dengan rekan sales kami di sini!",
    description : [],
    buttonText: 'Hubungi Sales Agent',
    price : '',
    buttonVariant: 'contained',
  },
];

export default function Pricing() {
  const classes = useStyles();
  const [paket, setPaket] = useState({});
  // let params = useParams();
  console.log(URLSearchParams(useLocation().search));


  function handleClickPackage(paket){
      setPaket(paket);
      toast.success("Anda telah memlilih " + paket.name, {
        position: toast.POSITION.TOP_CENTER
      });
  };



  return (
    <React.Fragment>
      
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <img 
        width="130px"
        src={LogoWMS} 
        alt="Logo WMS" 
        height="80px"
      />
      
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{color:"red"}}>
          WMS
        </Typography>
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Wifi Managed Service
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
        Internet WiFi Fiber Optic tanpa Kuota dan batasan penggunaan dengan beragam akses pilihan!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" align="center" key={line}>
                        <CheckCircleOutlineIcon fontSize="small" /> {line}
                      </Typography>
                    ))}
                  </ul>
                  <div className={classes.cardPricing}>
                    <Typography component="h5" variant="h5" color="textPrimary" >
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {(tier.id === '0'? '' : '/bulan')}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions className={classes.cardButtonSection}>
                    <Link to={{
                              pathname: '/form',
                              data : paket,
                            }}
                          style={{ textDecoration: 'none' }}>
                        <Button className={classes.cardButton}
                                variant="outlined"
                                onClick={() => {
                                            handleClickPackage({"id" : tier.id, "name" : tier.title})
                                          }
                                        }
                          >
                            {tier.buttonText}
                        </Button>
                    </Link> 
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      
      {/* Footer */}
      {/* <Container maxWidth="ld" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
        
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}