import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [zoom, setZoom] = useState(12);

  // Convert lat/lng to pixel coordinates for our simple map
  const latToY = (lat: number) => {
    const minLat = 25.7417;
    const maxLat = 25.7817;
    return ((maxLat - lat) / (maxLat - minLat)) * 300;
  };

  const lngToX = (lng: number) => {
    const minLng = -80.2118;
    const maxLng = -80.1718;
    return ((lng - minLng) / (maxLng - minLng)) * 400;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Reports Map</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {reports.length} Reports
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Interactive Map */}
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
              <h3 className="font-semibold">Miami Mangrove Area</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom(Math.min(zoom + 1, 16))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom(Math.max(zoom - 1, 8))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-2 py-1">
                  Zoom: {zoom}
                </span>
              </div>
            </div>
            
            <div 
              className="relative bg-gradient-to-br from-blue-100 via-green-50 to-emerald-100 h-80 overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 50% 10%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)
                `,
              }}
            >
              {/* Simulated coastline and water */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(45deg, 
                      transparent 30%, 
                      rgba(6, 182, 212, 0.2) 32%, 
                      rgba(6, 182, 212, 0.3) 50%, 
                      rgba(34, 197, 94, 0.2) 52%, 
                      transparent 70%
                    )
                  `
                }}
              />
              
              {/* Report markers */}
              {reports.map((report) => {
                const x = lngToX(report.longitude);
                const y = latToY(report.latitude);
                const isSelected = selectedReport?.id === report.id;
                
                return (
                  <div
                    key={report.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
                      <div 
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                          isSelected 
                            ? 'bg-red-500 ring-4 ring-red-200' 
                            : 'bg-red-600 hover:bg-red-500'
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-64 border z-30">
                          <h4 className="font-semibold text-sm mb-1">{report.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{report.userName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <h4 className="font-semibold text-sm mb-2">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Incident Report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Mangrove Area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span>Water Area</span>
                  </div>
                </div>
              </div>
              
              {/* Coordinates display */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <div className="text-xs text-gray-600">
                  Miami, Florida<br/>
                  25.7617°N, 80.1918°W
                </div>
              </div>
            </div>
          </div>

          {/* Selected Report Details */}
          {selectedReport && (
            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{selectedReport.title}</h4>
                  <Badge variant="outline" className="shrink-0">
                    {selectedReport.latitude.toFixed(4)}, {selectedReport.longitude.toFixed(4)}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{selectedReport.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedReport.userName}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedReport.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Reports List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">All Reports</h3>
            {reports.map((report) => (
              <Card 
                key={report.id} 
                className={`border-l-4 border-l-primary cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedReport?.id === report.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{report.title}</h4>
                    <Badge variant="outline" className="shrink-0">
                      {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {report.userName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Click to view on map
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MangroveMap;