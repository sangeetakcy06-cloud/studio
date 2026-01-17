'use server';

/**
 * @fileOverview A function that extracts skills from a LinkedIn profile.
 *
 * - extractSkillsFromLinkedIn - Extracts skills from a LinkedIn profile text.
 * - ExtractSkillsFromLinkedInInput - The input type for the extractSkillsFromLinkedIn function.
 * - ExtractSkillsFromLinkedInOutput - The return type for the extractSkillsFromLinkedIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractSkillsFromLinkedInInputSchema = z.object({
  profileText: z.string().describe('The text content of the LinkedIn profile.'),
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
  prompt: `You are an expert HR assistant. You will be given the text content of a LinkedIn profile.
      Based on the provided text, extract the key skills of the candidate.
      Return the skills as a simple array of strings.

      LinkedIn Profile Text: {{{profileText}}}`,
});

const extractSkillsFromLinkedInFlow = ai.defineFlow(
  {
    name: 'extractSkillsFromLinkedInFlow',
    inputSchema: ExtractSkillsFromLinkedInInputSchema,
    outputSchema: ExtractSkillsFromLinkedInOutputSchema,
  },
  async input => {
    const {output} = await extractSkillsFromLinkedInPrompt(input);
    return output!;
  }
);
