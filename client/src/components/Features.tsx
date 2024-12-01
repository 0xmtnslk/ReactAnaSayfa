import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, BarChart, Users, Zap } from "lucide-react";

const features = [
  {
    title: "Analytics",
    description: "Gain valuable insights with our advanced analytics platform",
    icon: LineChart,
  },
  {
    title: "Performance",
    description: "Optimize your operations for maximum efficiency",
    icon: BarChart,
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team members",
    icon: Users,
  },
  {
    title: "Quick Integration",
    description: "Easy setup and integration with your existing tools",
    icon: Zap,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">
            Everything you need to take your business to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
