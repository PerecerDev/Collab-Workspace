/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REALTIME_MODE?: 'mock' | 'socket';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
