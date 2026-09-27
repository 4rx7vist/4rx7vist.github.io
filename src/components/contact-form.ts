import { deliverInquiry, inquiryText, mailDraftUrl, contactEmail, type Inquiry } from '../lib/contact';

const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) {
  const button = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const fallback = form.querySelector<HTMLElement>('[data-contact-fallback]')!;
  const copy = form.querySelector<HTMLButtonElement>('[data-copy-inquiry]')!;
  const draft = form.querySelector<HTMLAnchorElement>('[data-open-draft]')!;
  const fallbackText = form.querySelector<HTMLTextAreaElement>('[data-fallback-text]')!;
  let currentStatus: 'draft' | 'accepted' | 'error' | 'copied' | 'copyError' | 'sending' | null = null;
  let isSending = false;
  const messages = {
    draft: { en: 'Your email draft is ready. Open it below and send it from your email app. Nothing has been sent from this website.', es: 'Tu borrador está listo. Ábrelo abajo y envíalo desde tu aplicación de correo. No se ha enviado nada desde este sitio.' },
    accepted: { en: 'Your request was accepted by the contact service. Thank you — I’ll review the details and get back to you.', es: 'El servicio de contacto aceptó tu solicitud. Gracias: revisaré los detalles y te responderé.' },
    error: { en: 'The contact service is unavailable. Your information is still here. Open an email draft or copy your inquiry below.', es: 'El servicio de contacto no está disponible. Tus datos siguen aquí. Abre un borrador o copia tu consulta abajo.' },
    copied: { en: `Inquiry copied. Paste it into an email to ${contactEmail}.`, es: `Consulta copiada. Pégala en un correo a ${contactEmail}.` },
    copyError: { en: 'Clipboard access is unavailable. Select and copy the prepared inquiry below.', es: 'No se pudo acceder al portapapeles. Selecciona y copia la consulta preparada abajo.' },
    sending: { en: 'Sending your inquiry…', es: 'Enviando tu consulta…' },
  };
  const lang = () => document.documentElement.lang === 'es' ? 'es' : 'en';
  function showStatus(key: keyof typeof messages) {
    currentStatus = key;
    status.textContent = messages[key][lang()];
    status.hidden = false;
    status.dataset.state = key;
  }
  function readInquiry(): Inquiry {
    const data = new FormData(form!);
    const value = (key: string) => String(data.get(key) || '').trim();
    return {
      name: value('name'),
      email: value('email'),
      phone: value('phone'),
      projectName: value('projectName'),
      proposal: value('proposal'),
    };
  }
  function prepareFallback(inquiry: Inquiry) {
    draft.href = mailDraftUrl(inquiry);
    fallbackText.value = inquiryText(inquiry);
    fallback.hidden = false;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (isSending) return;
    // Native required/email constraints run before this event; reject whitespace-only content too.
    for (const field of form!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : (lang() === 'es' ? 'Completa este campo.' : 'Please complete this field.'));
    }
    if (!form!.reportValidity()) return;
    const inquiry = readInquiry();
    isSending = true;
    button.disabled = true;
    form!.setAttribute('aria-busy', 'true');
    if (form!.dataset.endpoint) showStatus('sending');
    try {
      const delivery = await deliverInquiry(inquiry, form!.dataset.endpoint);
      if (delivery === 'email-draft') { prepareFallback(inquiry); showStatus('draft'); }
      else { fallback.hidden = true; showStatus('accepted'); }
    } catch { prepareFallback(inquiry); showStatus('error'); }
    finally {
      isSending = false;
      button.disabled = false;
      form!.removeAttribute('aria-busy');
      status.focus();
    }
  });
  form.addEventListener('input', event => {
    const input = event.target;
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) input.setCustomValidity('');
    if (!fallback.hidden) prepareFallback(readInquiry());
  });
  form.addEventListener('change', () => { if (!fallback.hidden) prepareFallback(readInquiry()); });
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(inquiryText(readInquiry())); showStatus('copied'); }
    catch { fallbackText.hidden = false; fallbackText.focus(); fallbackText.select(); showStatus('copyError'); }
  });
  window.addEventListener('languageChanged', () => { if (currentStatus) showStatus(currentStatus); });
}
