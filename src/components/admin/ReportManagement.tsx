import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  MoreHorizontal,
  MessageSquare,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Sample reports data
  const [reports] = useState([
    {
      id: 1,
      title: "Illegal Dumping Observed",
      description: "Found plastic waste dumped near mangrove roots in protected area",
      reporter: "John Doe",
      reporterEmail: "john@example.com",
      location: "Miami Bay, FL",
      coordinates: "25.7617, -80.1918",
      severity: "high",
      status: "pending",
      submitDate: "2024-01-30T10:30:00Z",
      images: 3,
      category: "pollution"
    },
    {
      id: 2,
      title: "Oil Spill in Water",
      description: "Small oil spill affecting nearby mangrove ecosystem",
      reporter: "Jane Smith",
      reporterEmail: "jane@example.com",
      location: "Tampa Bay, FL",
      coordinates: "25.7517, -80.1818",
      severity: "critical",
      status: "investigating",
      submitDate: "2024-01-29T14:45:00Z",
      images: 5,
      category: "pollution"
    },
    {
      id: 3,
      title: "Damaged Mangrove Trees",
      description: "Several mangrove trees have been cut down illegally",
      reporter: "Mike Johnson",
      reporterEmail: "mike@example.com",
      location: "Everglades, FL",
      coordinates: "25.7717, -80.2018",
      severity: "medium",
      status: "resolved",
      submitDate: "2024-01-28T09:15:00Z",
      images: 2,
      category: "deforestation"
    },
    {
      id: 4,
      title: "Unusual Wildlife Behavior",
      description: "Fish and birds showing signs of distress in mangrove area",
      reporter: "Sarah Wilson",
      reporterEmail: "sarah@example.com",
      location: "Florida Keys, FL",
      coordinates: "25.0840, -80.6081",
      severity: "low",
      status: "pending",
      submitDate: "2024-01-27T16:20:00Z",
      images: 1,
      category: "wildlife"
    },
    {
      id: 5,
      title: "Construction Near Protected Zone",
      description: "Unauthorized construction activity near mangrove conservation area",
      reporter: "David Brown",
      reporterEmail: "david@example.com",
      location: "Fort Lauderdale, FL",
      coordinates: "26.1224, -80.1373",
      severity: "high",
      status: "rejected",
      submitDate: "2024-01-26T11:30:00Z",
      images: 4,
      category: "development"
    }
  ]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || report.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "investigating": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "investigating": return <Eye className="h-4 w-4 text-blue-600" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Report Management</CardTitle>
              <p className="text-muted-foreground">Review and manage incident reports from the community</p>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Reports</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports by title, description, or reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investigating</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'investigating').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.severity === 'critical').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span>{report.images} images</span>
                        <span className="mx-2">•</span>
                        <span>{report.category}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.reporter}</p>
                      <p className="text-sm text-muted-foreground">{report.reporterEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{report.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{report.coordinates}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getSeverityBadgeColor(report.severity)}>
                      {report.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <Badge variant="secondary" className={getStatusBadgeColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(report.submitDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedReport?.title}</DialogTitle>
                            <DialogDescription>
                              Report ID: #{selectedReport?.id} • Submitted by {selectedReport?.reporter}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-4">
                              <div>
                                <Label>Description</Label>
                                <p className="text-sm mt-1">{selectedReport.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Location</Label>
                                  <p className="text-sm mt-1">{selectedReport.location}</p>
                                </div>
                                <div>
                                  <Label>Coordinates</Label>
                                  <p className="text-sm mt-1">{selectedReport.coordinates}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Severity</Label>
                                  <Badge variant="secondary" className={`${getSeverityBadgeColor(selectedReport.severity)} mt-1`}>
                                    {selectedReport.severity}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge variant="secondary" className={`${getStatusBadgeColor(selectedReport.status)} mt-1`}>
                                    {selectedReport.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label>Admin Response</Label>
                                <Textarea 
                                  placeholder="Add your response or notes about this report..."
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter className="gap-2">
                            <Button variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Reporter
                            </Button>
                            <Button variant="outline">Mark as Investigating</Button>
                            <Button>Resolve Report</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Mark Investigating
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportManagement;
