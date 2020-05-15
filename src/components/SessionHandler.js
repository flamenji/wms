// import React from 'react';
// import Cookies from 'js-cookie';
import {
    // BrowserRouter as Router, 
    // Link,
    // useLocation,
    useHistory 
  } from "react-router-dom";

module.exports = {
    IsLoggedIn

    // A: funtion(){

    
    // }

    // B: funtion(){
}


function IsLoggedIn(cookie){
    const history = useHistory();
    if(!cookies){
        alert("kontol");
    }    
}
// }

// export default function IsLoggedIn(cookies){
//     const history = useHistory();
//     if(!cookies){
//         alert("kontol")''
//     }    
//     // console.log(Cookies.get('connect.sid'));
//     //     if(!Cookies.get('connect.sid')){
//     //         alert("kontol");
//     //         history.push('/');
//     //     }
//         // return("");
// }