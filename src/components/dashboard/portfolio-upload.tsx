"use client";

import { useState, useTransition } from "react";
import { handleExtractSkills } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

type Props = {
  onSkillsExtracted: (skills: string[]) => void;
};

export function PortfolioUpload({ onSkillsExtracted }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };
  
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("resume") as HTMLInputElement;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please upload your resume to extract skills.",
        variant: "destructive",
      });
      return;
    }

    const file = fileInput.files[0];

    startTransition(async () => {
      try {
        const dataUri = await readFileAsDataURL(file);
        const result = await handleExtractSkills(dataUri);

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else if (result.skills) {
          onSkillsExtracted(result.skills);
          toast({
            title: "Success!",
            description: "Your skills have been extracted from your resume.",
          });
        }
      } catch (e) {
        toast({
          title: "Upload Failed",
          description: "There was an error processing your resume file.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Upload</CardTitle>
        <CardDescription>Upload your resume to automatically extract your skills. You can also link your profiles.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume</Label>
            <div className="flex items-center gap-2">
                <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                <Label htmlFor="resume" className="flex-grow border rounded-md px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-secondary">
                    {fileName || 'Choose a file...'}
                </Label>
                <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : <Upload />}
                Extract Skills
                </Button>
            </div>
          </div>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input id="github" placeholder="https://github.com/yourusername" disabled />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
