import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { recommendedJobs } from "@/lib/mock-data";
import { Briefcase, ChevronRight } from "lucide-react";

export function RecommendedJobs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase /> Recommended Jobs
                </CardTitle>
                <CardDescription>Based on your skills, here are some roles you might be interested in.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {recommendedJobs.map(job => (
                        <li key={job.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                             <Image 
                                src={job.logoUrl} 
                                alt={`${job.company} logo`} 
                                width={40} 
                                height={40} 
                                className="rounded-full border"
                                data-ai-hint={job.dataAiHint}
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-card-foreground">{job.role}</p>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <ChevronRight />
                                <span className="sr-only">View Job</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
