import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface IncidentReport {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  userId: string;
  userName: string;
}

const MangroveMap = () => {
  const [reports] = useState<IncidentReport[]>([
    {
      id: "1",
      title: "Illegal Dumping Observed",
      description: "Found plastic waste dumped near mangrove roots",
      latitude: 25.7617,
      longitude: -80.1918,
      timestamp: "2024-01-15T10:30:00Z",
      userId: "user1",
      userName: "John Doe"
    },
    {
      id: "2", 
      title: "Oil Spill in Water",
      description: "Small oil spill affecting nearby mangrove ecosystem",
      latitude: 25.7517,
      longitude: -80.1818,
      timestamp: "2024-01-14T14:45:00Z",
      userId: "user2",
      userName: "Jane Smith"
    },
    {
      id: "3",
      title: "Damaged Mangrove Trees",
      description: "Several mangrove trees have been cut down illegally",
      latitude: 25.7717,
      longitude: -80.2018,
      timestamp: "2024-01-13T09:15:00Z",
      userId: "user3",
      userName: "Mike Johnson"
    }
  ]);

  const center: [number, number] = [25.7617, -80.1918]; // Miami coordinates

  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Reports Map</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {reports.length} Reports
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.map((report) => (
              <Marker
                key={report.id}
                position={[report.latitude, report.longitude]}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p><strong>Reported by:</strong> {report.userName}</p>
                      <p><strong>Date:</strong> {new Date(report.timestamp).toLocaleDateString()}</p>
                      <p><strong>Location:</strong> {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MangroveMap;