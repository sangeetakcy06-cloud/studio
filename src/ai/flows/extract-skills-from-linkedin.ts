'use server';

/**
 * @fileOverview A function that extracts skills from a LinkedIn profile.
 *
 * - extractSkillsFromLinkedIn - Extracts skills from a LinkedIn profile.
 * - ExtractSkillsFromLinkedInInput - The input type for the extractSkillsFromLinkedIn function.
 * - ExtractSkillsFromLinkedInOutput - The return type for the extractSkillsFromLinkedIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractSkillsFromLinkedInInputSchema = z.object({
  linkedInUrl: z.string().url().describe('The URL of the LinkedIn profile.'),
});
export type ExtractSkillsFromLinkedInInput = z.infer<
  typeof ExtractSkillsFromLinkedInInputSchema
>;

const ExtractSkillsFromLinkedInOutputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('An array of skills extracted from the LinkedIn profile.'),
});
export type ExtractSkillsFromLinkedInOutput = z.infer<
  typeof ExtractSkillsFromLinkedInOutputSchema
>;

export async function extractSkillsFromLinkedIn(
  input: ExtractSkillsFromLinkedInInput
): Promise<ExtractSkillsFromLinkedInOutput> {
  return extractSkillsFromLinkedInFlow(input);
}

const extractSkillsFromLinkedInPrompt = ai.definePrompt({
  name: 'extractSkillsFromLinkedInPrompt',
  input: {schema: ExtractSkillsFromLinkedInInputSchema},
  output: {schema: ExtractSkillsFromLinkedInOutputSchema},
  prompt: `You are an expert HR assistant. You will be given a LinkedIn profile URL.
      Based on the information typically found on a LinkedIn profile (like job history, endorsements, and skills section), extract the key skills of the candidate.
      Return the skills as a simple array of strings.

      LinkedIn Profile: {{{linkedInUrl}}}`,
});

const extractSkillsFromLinkedInFlow = ai.defineFlow(
  {
    name: 'extractSkillsFromLinkedInFlow',
    inputSchema: ExtractSkillsFromLinkedInInputSchema,
    outputSchema: ExtractSkillsFromLinkedInOutputSchema,
  },
  async input => {
    // In a real application, you would use a tool to scrape the website.
    // For this demo, we'll rely on the model's knowledge or simulate the scraping.
    const {output} = await extractSkillsFromLinkedInPrompt(input);
    return output!;
  }
);
