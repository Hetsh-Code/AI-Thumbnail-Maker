
export type ViewType = 'creator' | 'library' | 'video2thumb' | 'performance' | 'account';

export interface ThumbnailConfig {
  title: string;
  headshot: string | null;
}

export interface SavedThumbnail {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

export interface GenerationState {
  loading: boolean;
  error: string | null;
  resultUrl: string | null;
  statusMessage: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
