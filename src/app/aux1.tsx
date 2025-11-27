"use client"
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { LatLng, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ----------------------------------------
// Tipos
// ----------------------------------------

interface MapProps {
  lat: number,
  lon: number,
}
export default function Map({ lat, lon }: MapProps) {
  const position = [lat, lon]
  return (
    <div>
      <MapContainer
      center={[lat,lon]}
      zoom={13}
      scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat,lon]}></Marker>
      </MapContainer>
    </div>
  )
}