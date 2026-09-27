export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  projectName: string;
  proposal: string;
};
export const contactEmail = 'alexissotomayor95@gmail.com';
export const contactPhone = '+593 96 818 7174';

export function inquiryText(inquiry: Inquiry): string {
  return [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Project: ${inquiry.projectName}`,
    '', 'Project proposal:', inquiry.proposal,
  ].join('\n');
}

/** Public endpoint only. Providers receive JSON; credentials must stay server-side. */
export async function deliverInquiry(inquiry: Inquiry, endpoint?: string): Promise<'accepted' | 'email-draft'> {
  if (!endpoint) return 'email-draft';
  const url = new URL(endpoint);
  if (url.protocol !== 'https:') throw new Error('Contact endpoint must use HTTPS.');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...inquiry, source: 'portvault' }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Contact service did not accept the request.');
    return 'accepted';
  } finally { window.clearTimeout(timeout); }
}

export function mailDraftUrl(inquiry: Inquiry): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`PORTVAULT — ${inquiry.projectName || 'Project inquiry'}`)}&body=${encodeURIComponent(inquiryText(inquiry))}`;
}
