import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User } from "lucide-react";

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
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg p-6 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
            <p className="text-muted-foreground">
              Full map functionality will be available soon. For now, browse reports below.
            </p>
          </div>
          
          {reports.map((report) => (
            <Card key={report.id} className="border-l-4 border-l-primary">
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
                    Location Coordinates
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MangroveMap;