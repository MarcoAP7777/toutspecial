/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getUser } from './auth';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}));

describe('getUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar null quando não há token', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const result = await getUser();
    expect(result).toBeNull();
  });

  it('deve retornar null quando o token é inválido', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: 'invalid-token' }),
    });

    (jwtVerify as jest.Mock).mockRejectedValue(new Error('Token inválido'));

    const result = await getUser();
    expect(result).toBeNull();
  });

  it('deve retornar payload quando o token é válido', async () => {
    const mockPayload = {
      payload: {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ADMIN' as const,
      },
    };

    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: 'valid-token' }),
    });

    (jwtVerify as jest.Mock).mockResolvedValue(mockPayload);

    const result = await getUser();
    expect(result).toEqual(mockPayload.payload);
  });
});
