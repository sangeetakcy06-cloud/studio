import { PlaceHolderImages } from './placeholder-images';

export type Job = {
  id: string;
  company: string;
  role: string;
  logoUrl: string;
  dataAiHint: string;
};

export type Application = {
  id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  date: string;
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const recommendedJobs: Job[] = [
  { id: '1', company: 'Innovate Inc.', role: 'Frontend Engineer', logoUrl: findImage('google-logo')?.imageUrl || '', dataAiHint: 'abstract logo' },
  { id: '2', company: 'QuantumLeap', role: 'Product Manager', logoUrl: findImage('meta-logo')?.imageUrl || '', dataAiHint: 'abstract logo' },
  { id: '3', company: 'DataWeavers', role: 'Data Scientist', logoUrl: findImage('netflix-logo')?.imageUrl || '', dataAiHint: 'abstract logo' },
  { id: '4', company: 'CloudSphere', role: 'Backend Developer', logoUrl: findImage('amazon-logo')?.imageUrl || '', dataAiHint: 'abstract logo' },
];

export const applicationHistory: Application[] = [
  { id: '1', company: 'Stripe', role: 'Software Engineer', status: 'Interviewing', date: '2024-05-10' },
  { id: '2', company: 'Shopify', role: 'UX Designer', status: 'Applied', date: '2024-05-15' },
  { id: '3', company: 'Figma', role: 'DevOps Engineer', status: 'Rejected', date: '2024-05-01' },
  { id: '4', company: 'Vercel', role: 'Frontend Developer', status: 'Offer', date: '2024-04-20' },
];
