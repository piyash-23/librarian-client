import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Coverage = () => {
  const position = [23.8041, 90.4152];
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setWarehouses([...data]);
        console.log(warehouses);
      });
  }, []);
  return (
    <>
      <div className="text-[#f8edeb] py-6">
        <h2 className="text-4xl font-bold text-[#00b4d8]">
          We deliver books every in corner of Bangladesh
        </h2>
        <p className="text-gray my-3">See our locations</p>
        <div className="h-[600px] p-4 bg-[#161a1d] rounded-2xl">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[570px] rounded-2xl"
          >
            {" "}
            {warehouses.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.district}</strong>
                  <br />
                  covered area: {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>React leaflet</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Coverage;
