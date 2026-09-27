export type Copy = { en: string; es: string };
export type NodeKind = 'client' | 'api' | 'database' | 'external' | 'service' | 'cloud';
export interface SystemNode { label: string; kind: NodeKind }
export interface System {
  slug: string;
  name: Copy;
  summary: Copy;
  problem: Copy;
  role: Copy;
  systemType: Copy;
  stack: string[];
  status: Copy;
  deliverables: Copy[];
  solutionTags: Copy[];
  architecture: SystemNode[];
  architectureNote: Copy;
  implementation: Copy;
  constraints: Copy;
  decisions: Copy;
  result: Copy;
  lessons: Copy;
  year: string;
  caseStudyAvailable: boolean;
  image?: string;
  imageCaption?: Copy;
}

const pending = (en: string, es: string): Copy => ({ en: `TODO — ${en}`, es: `TODO — ${es}` });
const role = pending('confirm exact contribution and team responsibilities.', 'confirmar contribución y responsabilidades del equipo.');
const status = pending('confirm deployment status', 'confirmar estado de despliegue');
const architectureNote: Copy = {
  en: 'Conceptual view based on the existing project description. TODO — validate the deployed topology and service boundaries.',
  es: 'Vista conceptual basada en la descripción existente. TODO — validar la topología desplegada y los límites de los servicios.',
};

export const systems: System[] = [
  {
    slug: 'donations-platform',
    name: { en: 'Banco de Alimentos Quito', es: 'Banco de Alimentos Quito' },
    summary: { en: 'A donation and operations platform built to improve internal processes and expand the organization’s reach.', es: 'Una plataforma de donaciones y operaciones para mejorar procesos internos y ampliar el alcance de la organización.' },
    problem: { en: 'Donations, payment gateways, and CRM operations need to share information without repetitive manual handoffs.', es: 'Las donaciones, pasarelas de pago y operaciones del CRM necesitan compartir información sin transferencias manuales repetitivas.' },
    role,
    systemType: { en: 'Payments / Integrations', es: 'Pagos / Integraciones' },
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Supabase', 'Monday.com API'],
    deliverables: [
      { en: 'A donation platform connecting online contributions with internal operations, designed to support a 70% increase in people reached.', es: 'Una plataforma de donaciones conectada con las operaciones internas, diseñada para ampliar en un 70% el número de personas alcanzadas.' },
      { en: 'An internal system to centralize donation follow-up and the organization’s operating workflows.', es: 'Un sistema interno para centralizar el seguimiento de donaciones y los flujos operativos de la organización.' },
      { en: 'Multiple payment gateway integrations with a unified transaction flow.', es: 'Integración de múltiples pasarelas de pago dentro de un flujo unificado de transacciones.' },
      { en: 'CRM and external-service integrations for reporting, synchronization, and automation.', es: 'Integraciones con CRM y servicios externos para reportes, sincronización y automatización.' },
    ],
    solutionTags: [
      { en: 'Donation platform', es: 'Plataforma de donaciones' },
      { en: 'CRM', es: 'CRM' },
      { en: 'Payment integration', es: 'Integración de pagos' },
      { en: 'External integrations', es: 'Integraciones externas' },
    ],
    status, year: 'TODO', caseStudyAvailable: true,
    image: 'baq.png', imageCaption: { en: 'Website preview · Banco de Alimentos Quito', es: 'Vista del sitio · Banco de Alimentos Quito' },
    architecture: [{ label: 'Donor', kind: 'client' }, { label: 'Donation API', kind: 'api' }, { label: 'Payments', kind: 'external' }, { label: 'Monday.com', kind: 'external' }],
    architectureNote,
    implementation: { en: 'The existing project connects donation operations, multiple payment gateways, CRM synchronization, and reporting. Monday.com provides the integration point for operational workflows.', es: 'El proyecto conecta donaciones, múltiples pasarelas de pago, sincronización del CRM y reportes. Monday.com sirve como punto de integración de los flujos operativos.' },
    constraints: pending('document payment-provider requirements, reconciliation rules, and data privacy constraints.', 'documentar requisitos de proveedores de pago, conciliación y privacidad de datos.'),
    decisions: pending('explain payment event handling, retry strategy, and the boundaries between the API and CRM.', 'explicar manejo de eventos de pago, reintentos y límites entre la API y el CRM.'),
    result: { en: 'The platform was designed to improve internal processes and support a 70% increase in the number of people reached by the organization.', es: 'La plataforma fue diseñada para mejorar los procesos internos y ampliar en un 70% el número de personas alcanzadas por la organización.' },
    lessons: pending('add a concrete lesson from building and maintaining the integration.', 'añadir una lección concreta de la construcción y mantenimiento de la integración.'),
  },
  {
    slug: 'clinic-management',
    name: { en: 'Dental clinic operations', es: 'Operaciones de consultorio odontológico' },
    summary: { en: 'A central system for patient records, appointments, communication, and billing.', es: 'Un sistema central para pacientes, citas, comunicación y facturación.' },
    problem: { en: 'Patient information, appointment reminders, and billing need a shared administrative workflow with appropriate access controls.', es: 'La información de pacientes, recordatorios de citas y facturación necesitan un flujo administrativo compartido con controles de acceso adecuados.' },
    role,
    systemType: { en: 'Healthcare / Operations', es: 'Salud / Operaciones' },
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    deliverables: [
      { en: 'A central administration system connecting patients, appointments, billing, and day-to-day operations.', es: 'Un sistema administrativo central que conecta pacientes, citas, facturación y operaciones diarias.' },
      { en: 'Structured electronic patient records with controlled access for the clinic team.', es: 'Historias clínicas electrónicas estructuradas con acceso controlado para el equipo.' },
      { en: 'Appointment scheduling with automated reminders through SMS and email.', es: 'Agenda de citas con recordatorios automáticos por SMS y correo electrónico.' },
      { en: 'Electronic billing and unified administrative follow-up in one workflow.', es: 'Facturación electrónica y seguimiento administrativo unificado en un solo flujo.' },
    ],
    solutionTags: [
      { en: 'Clinic management', es: 'Gestión clínica' },
      { en: 'Patient records', es: 'Historias clínicas' },
      { en: 'Appointment automation', es: 'Automatización de citas' },
      { en: 'Electronic billing', es: 'Facturación electrónica' },
    ],
    status, year: 'TODO', caseStudyAvailable: true,
    image: 'odontologica.png', imageCaption: { en: 'Project context · illustrative photograph', es: 'Contexto del proyecto · fotografía ilustrativa' },
    architecture: [{ label: 'Clinic team', kind: 'client' }, { label: 'Application', kind: 'service' }, { label: 'Records API', kind: 'api' }, { label: 'PostgreSQL', kind: 'database' }],
    architectureNote,
    implementation: { en: 'A central administration platform brings together electronic health records, appointment reminders, and electronic billing. The project description includes SMS and email notifications.', es: 'Una plataforma central reúne historias clínicas electrónicas, recordatorios de citas y facturación electrónica. La descripción del proyecto incluye notificaciones por SMS y correo.' },
    constraints: pending('document clinical data handling, access policies, and billing requirements.', 'documentar tratamiento de datos clínicos, políticas de acceso y requisitos de facturación.'),
    decisions: pending('describe the data model, permissions, and notification delivery strategy.', 'describir el modelo de datos, permisos y estrategia de envío de notificaciones.'),
    result: pending('add validated operational outcomes and approved product screenshots.', 'añadir resultados operativos validados y capturas autorizadas del producto.'),
    lessons: pending('document a real tradeoff encountered during implementation.', 'documentar una decisión y su contrapartida durante la implementación.'),
  },
];

export const solutionTypes = [
  { id: 'software', en: 'Custom Software', es: 'Software a medida' },
  { id: 'integration', en: 'API Integration', es: 'Integración de APIs' },
  { id: 'cloud', en: 'Cloud Infrastructure', es: 'Infraestructura cloud' },
  { id: 'automation', en: 'Workflow Automation', es: 'Automatización' },
  { id: 'ai', en: 'AI Systems', es: 'Sistemas de IA' },
  { id: 'consulting', en: 'Technical Consulting', es: 'Consultoría técnica' },
];
