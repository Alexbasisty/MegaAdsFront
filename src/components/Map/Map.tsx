import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import '../../utils/fix-map-icon';

import 'leaflet/dist/leaflet.css';
import './Map.css';

export const Map = () => {

    return (
        <div className="map">
            <MapContainer center={[52.3689115, 16.9105614]} zoom={18}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
                />
                <Marker position={[52.3689115, 16.9105614]}>
                    <Popup>
                        <h2>Home</h2>
                        <p>...or close ;-)</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};