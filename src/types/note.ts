// GET用 Type
export type CreateNoteRequest = {
	title: string;
	content?: string;
};

// POST用 Type
export type NoteResponse = {
	id: number;
	title: string;
	content: string | null;
	createdAt: string;
};
