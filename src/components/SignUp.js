import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import LMap from "./LMap"
// import CanvasDraw from "react-canvas-draw";
// import SignatureCanvas from 'react-signature-canvas'
import Copyright from './Copyright';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  Link
} from "react-router-dom";
import axios from 'axios';
import cogoToast from 'cogo-toast';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Map, Popup, TileLayer } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';
import 'leaflet/dist/leaflet.css';
// import L from "leaflet";
// import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LogoWMS from '../static/image/logo.svg';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';



// const IconCustom = new L.Icon({
//   iconUrl: require('../static/image/marker_1.png'),
//   iconAnchor: null,
//   iconRetinaUrl: require('../static/image/marker_1.png'),
//   popupAnchor: null,
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(30, 40),
//   opacity: 0.5,
//   className: 'leaflet-div-icon'
// });


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // button:{
    
  //   color:'primary',
  //   marginTop:"100px",
  // },
  panel:{
    backgroundColor : "#ffac33",
  },
  panelHeader:{
    backgroundColor : "#b26a00",
    // color:"white",
  },
  // buttonNextPanel:{
  //   backgroundColor : "#ffc107",
  // },
  button:{
    variant: 'contained',
    borderRadius:30,
    backgroundColor : "white",
    color : "black",
    '&:hover': {
      backgroundColor: "#ff9100",
      color: 'white',
  },
  }
}));

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function SignUp() {
  const classes = useStyles();
  const [initZoom, setInitZoom] = useState(6);
  const [initCoordinate,setInitCoordinate] = useState([-7.471410908357826,113.20312500000001]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cp1, setCp1] = useState("");
  const [cp2, setCp2] = useState("");
  const [ssid_name, setSSIDName] = useState("");
  const [latitude , setLatitude ] = useState("");
  const [longitude, setLongitude ] = useState("");
  // const [urlImage, setUrlImage] = useState("");
  // const [data, setData] = useState(useLocation());
  const [open, setOpen] = React.useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState('panel1');
  // const [canvas, setCanvas] = useState("");
  const [canvas2, setCanvas2] = useState("");
  const [zoom, setZoom] = useState(initZoom);
  const [coordinate , setCoordinate ] = useState(initCoordinate);
  // const [coordinate , setCoordinate ] = useState([-7.446107, 112.717702]);
  // const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function errorHandler(err){
    alert(`ERROR(${err.code}): ${err.message}`);
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  function getLocation(){
    setOpen(true);
    if(navigator.geolocation) {     
        // timeout at 60000 milliseconds (10 seconds)
        let options = {timeout:60000,enableHighAccuracy: true, maximumAge: 100};
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
     } else {
        alert("Sorry, browser does not support geolocation!");
     }
  }

  
  function showLocation(pos){
    const crd = pos.coords;
    setZoom(15);
    setCoordinate ([crd.latitude, crd.longitude]);
    // setInitCoordinate([crd.latitude, crd.longitude]);
  }

  function handleZoom(e){
    setZoom(e.target.getZoom());
    setCoordinate([e.target.getCenter().lat,e.target.getCenter().lng]);
    // setCoordinate ([crd.latitude, crd.longitude]);
  }    

  function handleMove(e){
    setCoordinate([e.target.getCenter().lat,e.target.getCenter().lng]);
    setZoom(e.target.getZoom());
    // setInitZoom(e.target.getZoom());
  }    

  function handleSubmit(e){
    e.preventDefault();
    // const signatureBase64 = canvas.canvasContainer.children[1].toDataURL("image/png");
    // console.log(image);
    const register = {
      name,
      email,
      cp1,
      cp2,
      address,
      latitude,
      longitude,
      ssid_name,
      // signatureBase64
    };
    // console.log(register);

    axios
    .post('http://localhost:5000/register', register)
    .then(resp => {
      console.log(resp.data);
      if (resp.data.message === "BERHASIL"){
        // alert(resp.data.message);  
        cogoToast.success("BERHASIL INPUT dengan ID : " + resp.data.id);
      }
      else{
        cogoToast.warning("GAGAL | " + resp.data.error);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <div>
      <img 
        width="130px"
        src={LogoWMS} 
        alt="Logo WMS" 
        height="80px"
      />
    <Container component="main" maxWidth="sm" >
      <div className={classes.paper}>
        <ExpansionPanel 
          expanded={expanded === 'panel1'} 
          onChange={handleChange('panel1')}
        >
        <ExpansionPanelSummary
          className={classes.panelHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Isi Identitas Dirimu disini!</Typography>
          {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="standard"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="Cp1"
                label="Contact Person 1"
                name="Cp1"
                autoComplete="Contact Person 1"
                type="number"
                onChange={e => setCp1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="Cp2"
                label="Contact Person 2"
                name="Cp2"
                autoComplete="Contact Person 2"
                type="number"
                onChange={e => setCp2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="ssid_name"
                label="SSID yang diinginkan"
                placeholder="Contoh: rumahceria@wifi.id"
                name="ssid_name"
                autoComplete="ssid_name"
                onChange={e => setSSIDName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="address"
                label="Installation Address"
                name="address"
                autoComplete="address"
                onChange={e => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Map 
                // center={initCoordinate}
                // zoom={initZoom}
                center={coordinate}
                zoom={zoom}
                onMove={handleMove}
                // onClick={alert('jontol')}
                onZoom={handleZoom}
                disableClick={true}
                // onMove={handleMove}
                // zoomControl={true}
                // doubleClickZoom= {false}
                // closePopupOnClick= {false}
                // dragging= {false}
                // zoomSnap= {false}
                // zoomDelta= {false}
                // trackResize= {false}
                // touchZoom= {false}
                // scrollWheelZoom= {false}
                // center={coordinate} zoom={13}
                // coordinate={coordinate}
                
              >
              <TileLayer
                // url="http://{s}.google.com/vt/lyrs=m/x={x}/y={y}/z={z}"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker 
                position={coordinate}
                disableClick={true}
                >
                <Popup>Lokasiku!</Popup>
              </Marker>
            </Map>
            </Grid>
            <Grid item xs={12}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  TransitionComponent={Zoom}
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Ijinkan Halaman Web mengakses lokasi anda"
                  >
                  <Button
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={getLocation}
                    >
                    <LocationOnIcon />
                    Get My Location
                  </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
            </Grid>
            <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={()=> setExpanded('panel2')}
            >
              <SkipNextOutlinedIcon />
              Next
            </Button>
          </Grid>
        </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          className={classes.panelHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography >Advanced settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div width="100%">
        {/* <Grid container spacing={2}> */}
        <Grid item xs={12} >
            {/* <SignatureCanvas 
                ref={SignatureCanvas => (setCanvas2(SignatureCanvas))}
                // canvasProps={{
                  // width:'450'
                  // maxWidth: 600, 
                  // maxHeight: 200, 
                  // className: 'sigCanvas'
                // }} 
            /> */}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={SignatureCanvas => { canvas2.clear()}}>
                  Clear
            </Button>
          </Grid> 
            
           
            <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={()=> setExpanded('panel2')}
            >
              <SkipNextOutlinedIcon />
              Next
            </Button>
          </Grid>
        {/* </Grid> */}
        </div>
        {/* <Grid container spacing={2}> */}
          {/* <Grid item xs={12}>
            <SignatureCanvas 
              ref={SignatureCanvas => (setCanvas2(SignatureCanvas))}
                canvasProps={{width: '100%', height: 200, className: 'sigCanvas'}} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={SignatureCanvas => { canvas2.clear()}}>
                  Clear
            </Button>
          </Grid> */}
        {/* </Grid> */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        <Grid>
          <Grid item xs={12}>
            <Box>
            <Link to="/">
              <Typography component="h5" variant="h5">
                Pilih Paket
              </Typography>
              <Avatar className={classes.avatar}> 
                <KeyboardBackspaceIcon />
              </Avatar>
            </Link>
            </Box>
          </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>   */}
        </Grid>
        </Grid>  
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}