'use server';

import { extractSkillsFromResume } from '@/ai/flows/extract-skills-from-resume';
import { extractSkillsFromLinkedIn } from '@/ai/flows/extract-skills-from-linkedin';
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
    if (!linkedInUrl) {
      return { error: 'LinkedIn profile URL cannot be empty.' };
    }
    const result = await extractSkillsFromLinkedIn({ profileUrl: linkedInUrl });
    return { skills: result.skills };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to extract skills from LinkedIn. Please try again.' };
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
