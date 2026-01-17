'use server';

import { extractSkillsFromResume } from '@/ai/flows/extract-skills-from-resume';
import { suggestRelevantSkills } from '@/ai/flows/suggest-relevant-skills';

export async function handleExtractSkills(resumeDataUri: string): Promise<{ skills?: string[]; error?: string }> {
  try {
    if (!resumeDataUri || !resumeDataUri.startsWith('data:')) {
      return { error: 'Invalid resume file format.' };
    }
    const result = await extractSkillsFromResume({ resumeDataUri });
    return { skills: result.skills };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to extract skills. Please try again.' };
  }
}

export async function handleExtractSkillsFromLinkedIn(linkedInUrl: string): Promise<{ skills?: string[]; error?: string }> {
  try {
    if (!linkedInUrl || !linkedInUrl.includes('linkedin.com')) {
      return { error: 'Please provide a valid LinkedIn profile URL.' };
    }

    // NOTE: Directly scraping LinkedIn profiles is technically challenging and often against their terms of service.
    // This is a simulated response. In a real application, you would use LinkedIn's official API
    // which requires authentication and user consent.
    console.warn("Simulating LinkedIn skill extraction. Not making a real network request.");

    const mockSkills = ["JavaScript", "React", "Next.js", "Tailwind CSS", "Project Management", "Team Leadership"];

    // Adding a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { skills: mockSkills };

  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while processing the LinkedIn URL.' };
  }
}


export async function handleSuggestSkills(jobDescription: string, userSkills: string[]): Promise<{ missingSkills?: string[]; learningResources?: string[]; error?: string }> {
    try {
        if (!jobDescription) {
            return { error: 'Job description cannot be empty.' };
        }
        const result = await suggestRelevantSkills({ jobDescription, userSkills });
        return result;
    } catch (e) {
        console.error(e);
        return { error: 'Failed to analyze skills. Please try again.' };
    }
}
