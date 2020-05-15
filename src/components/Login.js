import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router, 
    Link,
    useLocation,
    useHistory 
  } from "react-router-dom";
import LogoWMS from '../static/image/logo.svg';
import axios from 'axios';
// import fetch from 'fetch';
import cogoToast from 'cogo-toast';
import { useCookies } from 'react-cookie';
import JSCookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://wifi.id/assets/images/bg-wifi-business.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logowms:{
    marginLeft: theme.spacing(3),
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [canvasserId, setCanvasserId] = useState("DPR002");
  const [password, setPassword] = useState("canvasserTREG5");
  const [info, setInfo] = useState("");
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies('');


  function handleSubmit(e){
    e.preventDefault();
    // cogoToast.info("!!!!!!!!!!!");
    const data = new FormData() 
      data.append('canvasser_id' , canvasserId)
      data.append('password', password)
    // console.log(data);
    var warning = ""
    if (canvasserId.length == 0){
      warning += 'Username kosong '
      // cogoToast.warn('Username kosong')
      // return
    }
    if (password.length == 0){
      warning += 'Password kosong'
      // cogoToast.warn('Password kosong')
      // return
    }
    if (warning != ""){
      setInfo(warning)
      // cogoToast.warn(warning)
      return
    }
    // console.log(data['canvasser_id'])
    var setCookie = require('set-cookie-parser');


    axios
    .post('https://192.168.1.6:8443/login', 
    // .post('https://localhost:8443/login', 
      data, 
      {withCredentials: true,
        headers: { 
          crossDomain: true, 
          'Content-Type': 'application/json' }
     })
    .then(resp => {
      // console.log(resp.headers);
        console.table(document.cookie)
        history.push('/home');
        cogoToast.success('Login Success!')
    })
    .catch(function (error) {
      // console.log(error);
      alert(error)
      setInfo("SOMETHING HAPPENING")
      // setInfo(error.toString())
    })
  }
    

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <img 
                width="130px"
                src={LogoWMS} 
                alt="Logo WMS" 
                height="80px"
                className={classes.logowms}
            />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h5">
            Sign in
          </Typography>
          {/* <Typography> */}
          <div>
            {info}
          </div>
            
          {/* </Typography> */}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cid"
              label="Canvasser ID"
              name="cid"
              autoComplete="cid"
              autoFocus
              onChange={e => setCanvasserId(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              >
              Sign In
            </Button>
          
          </form>
        </div>
      </Grid>
    </Grid>
  );
}