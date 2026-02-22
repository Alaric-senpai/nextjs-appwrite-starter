import { vi, describe, it, expect } from 'vitest';
import { uploadFile, deleteFile, getFileView, getFileDownload } from '@/actions/storage.actions';

// Mock server/clients
vi.mock('@/server/clients', () => ({
  createClientSession: vi.fn().mockResolvedValue({
    storage: {
      createFile: vi.fn().mockResolvedValue({ $id: 'file-123', name: 'test.png' }),
      deleteFile: vi.fn().mockResolvedValue(true),
      getFileView: vi.fn().mockResolvedValue(Buffer.from('view')),
      getFileDownload: vi.fn().mockResolvedValue(Buffer.from('download')),
    },
  }),
}));

// Mock config
vi.mock('@/config/appwrite.config', () => ({
  appwritecfg: {
    bucketId: 'bucket-123',
    project: {
        id: 'project-123',
        endpoint: 'https://cloud.appwrite.io/v1',
    }
  },
}));

// Mock safe-action client
vi.mock('@/actions/safe-action', () => ({
  actionClient: {
    inputSchema: () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: (fn: any) => fn,
    }),
  },
}));

describe('Storage Actions', () => {
  it('uploads a file', async () => {
    const formData = new FormData();
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    formData.append('file', file);

    const result = await uploadFile(formData);
    expect(result.success).toBe(true);
    expect(result.file).toEqual({ $id: 'file-123', name: 'test.png' });
  });

  it('deletes a file', async () => {
    // Manually calling the action function as mocked
    const result = await deleteFile({ parsedInput: { fileId: 'file-123' } });
    expect(result.success).toBe(true);
  });

  it('gets file view', async () => {
    const result = await getFileView({ parsedInput: { fileId: 'file-123' } });
    expect(result.success).toBe(true);
    expect(result.base64).toBe(Buffer.from('view').toString('base64'));
  });

  it('gets file download', async () => {
    const result = await getFileDownload({ parsedInput: { fileId: 'file-123' } });
    expect(result.success).toBe(true);
    expect(result.base64).toBe(Buffer.from('download').toString('base64'));
  });
});
