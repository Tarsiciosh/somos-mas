import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './OngMap.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';


const positionMap = [-34.55881726737178, -58.47476996280374];

const MarkerIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});



export default function OngMap() {

  return (
    <>
      <div className='container-fluid mt-5'>
        <MapContainer center={positionMap} zoom={14} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.google.com.ar/maps" target="_BLANK">Open Google maps</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={positionMap} icon={MarkerIcon}>
            <Popup>Av. Dr. Ricardo Balbín 3126, Buenos Aires</Popup>
          </Marker>
        </MapContainer>
      </div>

    </>
  );
}
