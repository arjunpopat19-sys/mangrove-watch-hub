import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";

interface User {
  id: string;
  name: string;
  points: number;
  reports: number;
  avatar?: string;
}

const Leaderboard = () => {
  const [users] = useState<User[]>([
    { id: "1", name: "John Doe", points: 150, reports: 15 },
    { id: "2", name: "Jane Smith", points: 130, reports: 13 },
    { id: "3", name: "Mike Johnson", points: 120, reports: 12 },
    { id: "4", name: "Sarah Wilson", points: 100, reports: 10 },
    { id: "5", name: "David Brown", points: 90, reports: 9 },
    { id: "6", name: "Lisa Davis", points: 80, reports: 8 },
    { id: "7", name: "Tom Miller", points: 70, reports: 7 },
    { id: "8", name: "Anna Garcia", points: 60, reports: 6 },
  ]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-warning" />;
      case 2:
        return <Trophy className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span>Community Leaderboard</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Top contributors helping protect our mangrove ecosystems
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => {
            const rank = index + 1;
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-smooth hover:shadow-mangrove ${
                  rank <= 3 ? "bg-gradient-to-r from-primary/5 to-transparent" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(rank)}
                    <Badge variant={getRankBadgeVariant(rank)} className="min-w-[2rem] justify-center">
                      #{rank}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.reports} reports submitted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {user.points}
                  </div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gradient-nature rounded-lg">
          <div className="text-center text-primary-foreground">
            <h3 className="text-lg font-semibold mb-2">How to Earn Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>+10 points</strong><br />
                Submit valid incident report
              </div>
              <div>
                <strong>+5 points</strong><br />
                Verify another user's report
              </div>
              <div>
                <strong>+15 points</strong><br />
                First report in new area
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;