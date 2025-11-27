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
interface ChangeViewProps {
  center: [number, number];
}

interface DraggableMarkerProps {
  lat: number;
  lon: number;
  onMove: (coords: { lat: number; lng: number }) => void;
}

interface MapProps {
  lat: number;
  lon: number;
  setCoords: (coords: { lat: number; lon: number }) => void;
  recenter?: boolean;
}

// ----------------------------------------
// Componentes internos
// ----------------------------------------
function ChangeView({ center, recenter }: { center: [number, number], recenter: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (recenter) {
      console.log("Recentering map: ", center)
      map.setView(center);
    }
  }, [center, recenter])
  return null;
}

function DraggableMarker({ lat, lon, onMove }: DraggableMarkerProps) {
  const [position, setPosition] = useState<[number, number]>([lat, lon]);
  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      console.log("Se esta moviendo el marker")
      console.log(marker?.getLatLng)
      if (marker) {
        const newPos: LatLng = marker.getLatLng();
        console.log("🎯 Coordenadas desde DraggableMarker:", newPos);
        setPosition([newPos.lat, newPos.lng]);
        onMove({ lat: newPos.lat, lng: newPos.lng });
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

// ----------------------------------------
// Componente principal
// ----------------------------------------
export default function Map({ lat, lon, setCoords }: MapProps) {
  const updateLocation = ({ lat, lng }: { lat: number; lng: number }) => {
    console.log("📍 Nueva posición desde updateLocation:", { lat, lng });
    setCoords({ lat, lon: lng });
  };
  
  return (
    <div className="w-full h-100">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ width: "100%", height: "90%" }}
        scrollWheelZoom={true}
        className="rounded-lg z-10"
      >
        <ChangeView center={[lat, lon]}  recenter={true}/>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
          </a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <DraggableMarker lat={lat} lon={lon} onMove={updateLocation} />
      </MapContainer>
    </div>
  );
}
