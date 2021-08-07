import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const AnyReactComponent = () => <RoomIcon />;

const GoogleMap = () => {
  const [defaultState] = useState({
    center: {
      lat: 46.05896706445856,
      lng: 0.9701990379255375,
    },
    zoom: 11,
  });

  return (
    // Important! Always set the container height explicitly
    <div style={{height: '15em', width: '30%', margin: '2rem'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_GOOGLE_MAPS}}
        defaultCenter={defaultState.center}
        defaultZoom={defaultState.zoom}
      >
        <AnyReactComponent
          lat={46.05896706445856}
          lng={0.9701990379255375}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
