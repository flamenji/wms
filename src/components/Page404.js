import React from 'react';
import LogoWMS from '../static/image/logo.svg';

export default function Page404(){
    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: '#121212',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div 
                style={{ 
                    backgroundImage: "url('https://www.itl.cat/pngfile/big/44-448645_red-space-1920x1080-hd-wallpaper-red-space-desktop.jpg')",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundSize: 'cover',
                    mixBlendMode: 'overlay',
                    }}>
            
                </div>
                <div style={{
                    fontFamily: 'Alfa Slab One',
                    fontSize: '144px',
                    height: '100vh',
                    color: 'white',
                    width: '100%',
                    display: 'flex',
                    backgrundPosition: 'center',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                }}>
                    404
                    <img 
                        width="130px"
                        src={LogoWMS} 
                        alt="Logo WMS" 
                        height="80px"
                    />
                </div>
                
            </div>
    );
}