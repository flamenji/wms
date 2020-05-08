import React, { useState, useEffect  } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { Map, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Marker from 'react-leaflet-enhanced-marker';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LogoWMS from '../static/image/logo.svg';
// import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import {SketchField, Tools} from 'react-sketch';
import ImageUploader from "react-images-upload";
import queryString from 'query-string';
import {
  BrowserRouter as Router, 
  Link,
  useLocation,
  useHistory 
} from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));


export default function FormRegister() {
  const classes = useStyles();
  const history = useHistory();
  let data = useLocation();
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
  const [open, setOpen] = useState(false);
  const [canvas, setCanvas] = useState({
    lineWidth: 5,
    // lineColor: 'black',
    lineColor: 'red',
    fillColor: '#68CCCA',
    backgroundColor: 'transparent',
    shadowWidth: 0,
    shadowOffset: 0,
    tool: Tools.Pencil,
    enableRemoveSelected: false,
    fillWithColor: false,
    fillWithBackgroundColor: false,
    drawings: [],
    canUndo: false,
    canRedo: false,
    controlledSize: false,
    sketchWidth: 600,
    sketchHeight: 150,
    stretched: true,
    stretchedX: false,
    stretchedY: false,
    originX: 'left',
    originY: 'top',
    imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
    expandTools: false,
    expandControls: false,
    expandColors: false,
    expandBack: false,
    expandImages: false,
    expandControlled: false,
    text: 'a text, cool!',
    enableCopyPaste: false,
  });
  const [newCanvas, setNewCanvas] = useState("");
  const [zoom, setZoom] = useState(initZoom);
  const [coordinate , setCoordinate ] = useState(initCoordinate);
  const [pictureIdentity, setPictureIdentity] = useState([]);
  const [pictureSelfie, setPictureSelfie] = useState([]);
  
  useEffect(() => {
      if (!data['data']){
        history.push('/');
      }
  });

  const onDropPictureIdentity = pictureIdentity => {
    setPictureIdentity([...pictureIdentity, pictureIdentity]);
    // console.log(pictureIdentity);
  };

  const onDropPictureSelfie = pictureSelfie => {
    setPictureSelfie([...pictureSelfie, pictureSelfie]);
    // console.log(pictureIdentity);
  };
  const handleTooltipClose = () => {
    setOpen(false);
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
  }

  function handleZoom(e){
    setZoom(e.target.getZoom());
    setCoordinate([e.target.getCenter().lat,e.target.getCenter().lng]);
  }    

  function handleMove(e){
    setCoordinate([e.target.getCenter().lat,e.target.getCenter().lng]);
    setZoom(e.target.getZoom());
    // setInitZoom(e.target.getZoom());
  }    

  function handleSubmit(){
    // e.preventDefault();
    const register = new FormData() 
    register.append('name' , name)
    register.append('email', email)
    register.append('cp1', cp1)
    register.append('cp2', cp2)
    register.append('address', address)
    register.append('latitude', coordinate[0])
    register.append('longitude', coordinate[1])
    register.append('ssid_name', ssid_name)
    register.append('signatureBase64', newCanvas.toDataURL())
    register.append('picture_identity',pictureIdentity[0])
    register.append('picture_selfie', pictureSelfie[0])
    console.log(register);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
  
    axios
    .post('http://localhost:5000/register', register)
    .then(resp => {
      console.log(resp.data);
      if (resp.data.message === "BERHASIL"){
        // alert(resp.data.message);  
        cogoToast.success("BERHASIL INPUT dengan ID : " + resp.data.id);
      }
      else{
        alert('GAGAL | ' + resp.data.error)
        // cogoToast.warning("GAGAL | " + resp.data.error);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();


  const handleNext = () => {
    // console.log(activeStep);
    if (activeStep == (steps.length-1)){
      handleSubmit();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ['Isi Data Diri', 'Upload Foto Identitas', 'Tanda Tangan'];
  }


  function clearCanvas(){
    newCanvas.clear();
    // console.log(newCanvas);
  }

  function downloadCanvas(){
    var download = document.createElement('a');
    download.href = newCanvas.toDataURL();
    download.target = '_blank';
    download.download = 'filename.png';
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                       false, false, false, false, 0, null);
    download.dispatchEvent(evt);
  }
  return (
    <div>
      <img 
        width="130px"
        src={LogoWMS} 
        alt="Logo WMS" 
        height="80px"
      />

      <form>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {/*================== STEP 1 ===================== */}
              {(activeStep === 0)?((
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
                        center={coordinate}
                        zoom={zoom}
                        onMove={handleMove}
                        onZoom={handleZoom}
                        disableClick={true}
                        // height={100}
                        // width={100}
                      >
                      <TileLayer
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
                </Grid>
              )):''}

              {/*================== STEP 2 ===================== */}
              {(activeStep === 1)?((
                <Grid container spacing={2}>
                <Grid 
                  item 
                  xs={12} 
                  > 
                <ImageUploader
                      withIcon={true}
                      onChange={onDropPictureIdentity}
                      imgExtension={[".jpg", ".png",]}
                      maxFileSize={5242880}
                      singleImage={true}
                      withPreview={true}
                      buttonText={'Upload Foto Kartu Identitas'}
                    />
                  </Grid> 
                  <Grid 
                  item 
                  xs={12} 
                  > 
                <ImageUploader
                      withIcon={true}
                      onChange={onDropPictureSelfie}
                      imgExtension={[".jpg", ".png",]}
                      maxFileSize={5242880}
                      singleImage={true}
                      withPreview={true}
                      buttonText={'Upload Foto selfie memegang Kartu Identitas'}
                    />
                  </Grid> 
              </Grid>
                )):''}

              {/*================== STEP 3 ===================== */}
              {(activeStep === 2)?((
              
              <Grid container spacing={2}>
                  <Grid 
                    item 
                    xs={12} 
                    
                    > 
                    <div
                    style={{
                      borderStyle:'solid',
                      borderWidth:'1px'
                    }}>
                    <SketchField 
                          ref = {(c) => (setNewCanvas(c))}
                          lineColor={canvas.lineColor}
                          lineWidth={canvas.lineWidth}
                          backgroundColor={canvas.backgroundColor}
                          fillColor={canvas.fillColor}
                          width={canvas.width}
                          height={canvas.height}
                          value={canvas}
                          tool={canvas.tool}
                          // onChange={onChangeHandle}
                          forceValue
                         />
                         </div>
                </Grid>
                <Grid item xs={12}
                  mb={'40px'}>
                  <Button 
                    onClick={clearCanvas}
                    variant="contained"
                    // color="secondary"
                  >
                        Clear
                  </Button>
                  {/* <Button 
                    onClick={downloadCanvas}
                    variant="contained"
                    color="primary"
                    >
                        Download
                  </Button> */}
                </Grid> 
              </Grid>
              
              )):''}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length? handleSubmit:null} */}
      {activeStep === steps.length && (
        // {{handleSubmit}}
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Selamat anda telah mengisi data diri untuk pengajuan WMS!</Typography>
          {/* <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button> */}
        </Paper>
      )}
      </form>
    </div>
  );
}

