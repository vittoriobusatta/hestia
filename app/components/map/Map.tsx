"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  strongZoom?: boolean;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center, strongZoom }) => {
  return (
    <div className="map__container">
      <MapContainer
        center={(center as L.LatLngExpression) || [-21.1151, 55.5364]}
        zoom={strongZoom ? 14 : center ? 10 : 9}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer url={url} attribution={attribution} />
        {center && <Marker position={center as L.LatLngExpression} />}
      </MapContainer>
    </div>
  );
};

export default Map;
