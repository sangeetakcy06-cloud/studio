"use client";

import { useState, useTransition } from "react";
import { handleExtractSkills, handleExtractSkillsFromLinkedIn } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Linkedin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleResumeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleLinkedInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const linkedInInput = form.elements.namedItem("linkedin-url") as HTMLInputElement;
    const linkedInUrl = linkedInInput.value;

    if (!linkedInUrl) {
        toast({
            title: "No LinkedIn profile URL",
            description: "Please enter your LinkedIn profile URL.",
            variant: "destructive",
        });
        return;
    }
    
    startTransition(async () => {
        const result = await handleExtractSkillsFromLinkedIn(linkedInUrl);

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
                description: "Your skills have been extracted from your LinkedIn profile.",
            });
        }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Upload</CardTitle>
        <CardDescription>Upload your resume or provide your LinkedIn profile URL to automatically extract your skills.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>
            <TabsContent value="resume" className="pt-4">
                <form onSubmit={handleResumeSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="resume-file">Upload Resume</Label>
                        <div className="flex items-center gap-2">
                            <Input id="resume-file" name="resume" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                            <Label htmlFor="resume-file" className="flex-grow border rounded-md px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-secondary">
                                {fileName || 'Choose a file...'}
                            </Label>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="animate-spin" /> : <Upload />}
                                Extract Skills
                            </Button>
                        </div>
                    </div>
                </form>
            </TabsContent>
            <TabsContent value="linkedin" className="pt-4">
                <form onSubmit={handleLinkedInSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                         <Input 
                            id="linkedin-url"
                            name="linkedin-url"
                            placeholder="https://www.linkedin.com/in/your-profile"
                         />
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? <Loader2 className="animate-spin" /> : <Linkedin />}
                        Extract Skills
                    </Button>
                </form>
            </TabsContent>
        </Tabs>
        
        <div className="space-y-4 pt-6">
            <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Optional
                    </span>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input id="github" placeholder="https://github.com/yourusername" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
