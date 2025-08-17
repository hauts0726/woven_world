// types/index.ts
export interface ChapterSection {
  title: string;
  authorIds: string[];
  content: string[];
}

export interface Chapter {
  id: number;
  title: string;
  image?: string;
  description?: string;
  content?: string[];
  artists?: string[];
  intro?: string[];
  sections?: ChapterSection[];
}

// types/index.ts
export interface Artwork {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface StreetLibraryImage {
  url: string;
  title: string;
  description: string;
}

export interface StreetLibrary {
  concept: string;
  mechanism: {
    write: string;
    read: string;
    weave: string;
  };
  features: string[];
  message: string;
  images: StreetLibraryImage[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  shortBio: string;
  bio: string[];
  artworks?: Artwork[];
  streetLibrary?: StreetLibrary;
}

export interface Speaker {
  id: string;
  name: string;
  image: string;
  shortBio: string;
  bio: string[];
}


export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  dateText?: string;
  summary: string;
  description: string[];
  image?: string;
  speakers?: string[];
}
