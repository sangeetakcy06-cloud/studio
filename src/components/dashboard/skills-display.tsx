import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

type Props = {
  skills: string[];
};

export function SkillsDisplay({ skills }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb /> Your Skills
        </CardTitle>
        <CardDescription>
          {skills.length > 0 ? "Here are the skills extracted from your portfolio." : "Upload your resume to see your skills here."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-medium">
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>No skills to display yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
