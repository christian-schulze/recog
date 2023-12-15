export interface Notebook {
  id?: number | null;
  name: string;
}

export interface Note {
  id?: number | null;
  title: string;
  body: string;
  tags?: Tag[] | null;
}

export interface Tag {
  id?: number | null;
  name: string;
}

export interface DraftNotebook {
  name: string;
}

export interface DraftNote {
  title: string;
  notebookId: number;
}
