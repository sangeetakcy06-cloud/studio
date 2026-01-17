"use client";

import { useState, useTransition } from "react";
import { handleSuggestSkills } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Sparkles, BookOpen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type Props = {
  userSkills: string[];
};

type AnalysisResult = {
    missingSkills: string[];
    learningResources: string[];
}

export function SkillGapAnalysis({ userSkills }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const jobDescriptionInput = form.elements.namedItem("job-description") as HTMLTextAreaElement;
    const jobDescription = jobDescriptionInput.value;

    if (!jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please paste a job description to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    if (userSkills.length === 0) {
        toast({
            title: "Missing Skills",
            description: "Please upload your resume first to extract your skills.",
            variant: "destructive",
        });
        return;
    }

    setResult(null);
    startTransition(async () => {
        const analysis = await handleSuggestSkills(jobDescription, userSkills);
        if (analysis.error) {
            toast({
                title: "Analysis Failed",
                description: analysis.error,
                variant: "destructive",
            });
        } else {
            setResult({
                missingSkills: analysis.missingSkills || [],
                learningResources: analysis.learningResources || [],
            });
        }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Search /> Skill Gap Analysis
        </CardTitle>
        <CardDescription>Paste a job description to identify skill gaps and get learning recommendations.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea placeholder="Paste the full job description here..." id="job-description" name="job-description" rows={8} />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Analyze with AI
          </Button>
        </form>

        {isPending && (
            <div className="space-y-4 pt-4">
                <div className="flex justify-center items-center flex-col gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin h-8 w-8" />
                    <p>AI is analyzing... this may take a moment.</p>
                </div>
            </div>
        )}

        {result && (
          <div className="space-y-6 pt-4">
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="text-accent"/> Identified Skill Gaps</h3>
              {result.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="destructive">{skill}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specific skill gaps identified. You're a great fit!</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><BookOpen className="text-accent"/> Recommended Learning Resources</h3>
              {result.learningResources.length > 0 ? (
                 <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {result.learningResources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                    ))}
                 </ul>
              ) : (
                <p className="text-muted-foreground">No specific resources recommended.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
