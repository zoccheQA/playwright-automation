import { randomUUID } from 'node:crypto';

export interface RegistrationDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

/** Gera um usuário válido com e-mail único. Use `overrides` para variar campos por cenário. */
export function buildUser(overrides: Partial<RegistrationDetails> = {}): RegistrationDetails {
  return {
    firstName: 'Morgan',
    lastName: 'QA',
    dateOfBirth: '1990-05-15',
    country: 'US',
    postalCode: '94105',
    houseNumber: '42',
    street: 'Example Avenue',
    city: 'San Francisco',
    state: 'California',
    phone: '4155550134',
    email: `qa-${randomUUID()}@example.com`,
    password: 'Qatoolshop!2026',
    ...overrides,
  };
}

/** Credenciais sintéticas que não existem na aplicação. */
export function buildUnregisteredCredentials(): Credentials {
  return {
    email: `unregistered-${randomUUID()}@example.test`,
    password: 'InvalidPassword!2026',
  };
}
