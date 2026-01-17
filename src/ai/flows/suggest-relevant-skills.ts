'use server';

/**
 * @fileOverview A flow to suggest relevant skills based on job market demands.
 *
 * - suggestRelevantSkills - A function that suggests relevant skills.
 * - SuggestRelevantSkillsInput - The input type for the suggestRelevantSkills function.
 * - SuggestRelevantSkillsOutput - The return type for the suggestRelevantSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantSkillsInputSchema = z.object({
  jobDescription: z.string().describe('The job description to analyze.'),
  userSkills: z.array(z.string()).describe('The skills the user currently has.'),
});
export type SuggestRelevantSkillsInput = z.infer<typeof SuggestRelevantSkillsInputSchema>;

const SuggestRelevantSkillsOutputSchema = z.object({
  missingSkills: z.array(z.string()).describe('The skills the user is missing based on the job description.'),
  learningResources: z.array(z.string()).describe('Recommended learning resources for the missing skills.'),
});
export type SuggestRelevantSkillsOutput = z.infer<typeof SuggestRelevantSkillsOutputSchema>;

export async function suggestRelevantSkills(input: SuggestRelevantSkillsInput): Promise<SuggestRelevantSkillsOutput> {
  return suggestRelevantSkillsFlow(input);
}

const suggestRelevantSkillsTool = ai.defineTool({
  name: 'getLearningResources',
  description: 'Returns learning resources for a given skill.',
  inputSchema: z.object({
    skill: z.string().describe('The skill to find learning resources for.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of learning resources for the given skill.'),
}, async (input) => {
  // Mock implementation for learning resources.
  // In a real application, this would call an external API or database.
  const skill = input.skill.toLowerCase();
  if (skill.includes('react')) {
    return [
      'React Official Documentation',
      'Udemy - React Complete Guide',
      'Coursera - React Basics',
    ];
  } else if (skill.includes('node')) {
    return [
      'Node.js Official Documentation',
      'Udemy - Node.js Complete Guide',
      'Coursera - Node.js Basics',
    ];
  } else if (skill.includes('typescript')) {
    return [
      'Typescript Official Documentation',
      'Udemy - Typescript Complete Guide',
      'Coursera - Typescript Basics',
    ];
  } else {
    return [
      'Google Search',
      'Stack Overflow',
      'Relevant documentation for the skill.',
    ];
  }
});

const prompt = ai.definePrompt({
  name: 'suggestRelevantSkillsPrompt',
  input: {schema: SuggestRelevantSkillsInputSchema},
  output: {schema: SuggestRelevantSkillsOutputSchema},
  tools: [suggestRelevantSkillsTool],
  prompt: `You are a career advisor. A user has a certain set of skills and is applying for a job with the following job description.

Job Description: {{{jobDescription}}}

User Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}

Identify the skills the user is missing based on the job description. Recommend learning resources for each missing skill using the getLearningResources tool.

Output the missing skills and learning resources in a JSON format.
`,
});

const suggestRelevantSkillsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantSkillsFlow',
    inputSchema: SuggestRelevantSkillsInputSchema,
    outputSchema: SuggestRelevantSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
