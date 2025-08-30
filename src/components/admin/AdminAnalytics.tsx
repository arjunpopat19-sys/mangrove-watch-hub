import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  FileText,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const AdminAnalytics = () => {
  // Sample analytics data
  const monthlyReports = [
    { month: "Jan", reports: 45, resolved: 38 },
    { month: "Feb", reports: 52, resolved: 45 },
    { month: "Mar", reports: 48, resolved: 42 },
    { month: "Apr", reports: 61, resolved: 55 },
    { month: "May", reports: 55, resolved: 48 },
    { month: "Jun", reports: 67, resolved: 59 }
  ];

  const reportCategories = [
    { name: "Pollution", value: 145, color: "#ef4444" },
    { name: "Deforestation", value: 89, color: "#f97316" },
    { name: "Wildlife", value: 67, color: "#eab308" },
    { name: "Development", value: 45, color: "#22c55e" },
    { name: "Other", value: 41, color: "#6366f1" }
  ];

  const userGrowth = [
    { month: "Jan", users: 1156 },
    { month: "Feb", users: 1203 },
    { month: "Mar", users: 1189 },
    { month: "Apr", users: 1245 },
    { month: "May", users: 1298 },
    { month: "Jun", users: 1345 }
  ];

  const responseTime = [
    { day: "Mon", avgTime: 2.4 },
    { day: "Tue", avgTime: 1.8 },
    { day: "Wed", avgTime: 2.1 },
    { day: "Thu", avgTime: 2.7 },
    { day: "Fri", avgTime: 3.2 },
    { day: "Sat", avgTime: 2.9 },
    { day: "Sun", avgTime: 2.1 }
  ];

  const locationStats = [
    { location: "Miami", reports: 87, severity: "high" },
    { location: "Tampa", reports: 64, severity: "medium" },
    { location: "Orlando", reports: 45, severity: "low" },
    { location: "Jacksonville", reports: 52, severity: "medium" },
    { location: "Fort Lauderdale", reports: 39, severity: "low" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Analytics Dashboard</CardTitle>
              <p className="text-muted-foreground">Comprehensive insights and data analysis</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Generate Report</Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold text-green-600">89.2%</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+5.1% from last month</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-blue-600">2.4h</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span>-18% improvement</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-purple-600">1,245</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.2% growth</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Reports</p>
                <p className="text-2xl font-bold text-red-600">12</p>
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+3 this week</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Reports Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports & Resolutions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReports}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reports" fill="#3b82f6" name="Total Reports" />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Report Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {reportCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Reports by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationStats.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{location.location}</p>
                    <p className="text-sm text-muted-foreground">{location.reports} reports</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className={getSeverityColor(location.severity)}>
                    {location.severity} priority
                  </Badge>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(location.reports / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{location.reports}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", reports: 45, points: 892 },
                { name: "Jane Smith", reports: 38, points: 756 },
                { name: "Mike Johnson", reports: 32, points: 643 },
                { name: "Sarah Wilson", reports: 28, points: 567 },
                { name: "David Brown", reports: 25, points: 489 }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.reports} reports</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{user.points} points</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Uptime</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-full"></div>
                  </div>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response Time</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-sm font-medium">125ms</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Performance</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-5/6"></div>
                  </div>
                  <span className="text-sm font-medium">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full w-3/5"></div>
                  </div>
                  <span className="text-sm font-medium">67%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
