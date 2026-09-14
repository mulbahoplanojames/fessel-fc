import { requirePlayer } from "@/lib/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Target, TrendingUp } from "lucide-react";

export default async function PlayerPortalPage() {
  const session = await requirePlayer();

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Player Portal</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Matches</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next match in 2 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals This Season</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assists</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Top 5 in team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Match Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Training Schedule</CardTitle>
            <CardDescription>Upcoming training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Morning Practice</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 8:00 AM</p>
                </div>
                <Badge>Required</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tactical Meeting</p>
                  <p className="text-sm text-muted-foreground">Wednesday, 10:00 AM</p>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Gym Session</p>
                  <p className="text-sm text-muted-foreground">Friday, 2:00 PM</p>
                </div>
                <Badge>Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>Your last 5 matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">vs Monrovia FC</p>
                  <p className="text-sm text-muted-foreground">2-1 Win</p>
                </div>
                <Badge className="bg-green-500">Goal</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">vs Liberia United</p>
                  <p className="text-sm text-muted-foreground">1-1 Draw</p>
                </div>
                <Badge variant="outline">Assist</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">vs Nimba FC</p>
                  <p className="text-sm text-muted-foreground">3-0 Win</p>
                </div>
                <Badge className="bg-green-500">Goal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
