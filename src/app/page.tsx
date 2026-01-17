"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { PortfolioUpload } from "@/components/dashboard/portfolio-upload";
import { SkillsDisplay } from "@/components/dashboard/skills-display";
import { SkillGapAnalysis } from "@/components/dashboard/skill-gap-analysis";
import { RecommendedJobs } from "@/components/dashboard/recommended-jobs";
import { ApplicationTracker } from "@/components/dashboard/application-tracker";

export default function Home() {
  const [userSkills, setUserSkills] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <DashboardHeader />
      <main className="p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-8">
                <PortfolioUpload onSkillsExtracted={setUserSkills} />
                <SkillsDisplay skills={userSkills} />
            </div>

            <div className="lg:col-span-2 space-y-8">
                <SkillGapAnalysis userSkills={userSkills} />
                <RecommendedJobs />
            </div>
        </div>
        
        <div>
            <ApplicationTracker />
        </div>
      </main>
    </div>
  );
}
