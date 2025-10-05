import { afterEach, vi } from 'vitest';

// Limpia mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});
