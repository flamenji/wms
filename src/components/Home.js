import React, {useState, useLocation, useEffect} from 'react';
import Cookies from 'js-cookie';
import {
    // BrowserRouter as Router, 
    // Link,
    // useLocation,
    useHistory 
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Home(){
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if(!Cookies.get('connect.sid')){
            alert("Log Out!");
            history.push('/');
        }
      });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        </div>
    );
}