
import { getAllNotes, createNote, deleteNote } from "@/src/service/notes.service";
import { requireAuth } from "@/lib/utils/auth";

// 1件取得 GET    /notes/:id
// 更新 PUT    /notes/:id

// 一覧取得 GET /notes
export async function GET(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  // notes全件取得
  const res = await getAllNotes();
  return Response.json(res)
}

// 作成 POST   /notes
export async function POST(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();

  const { title, content } = body;

  if (!title) {
    return new Response("Title is required", { status: 400 });
  }

  const result = await createNote({ title, content });

  return Response.json(result);
}

// 削除 DELETE /notes/:id
export async function DELETE(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  const result = await deleteNote(id);

  if (!result) {
    return new Response("Note not found", { status: 404 });
  }

  return Response.json({ success: true, deleted: result });
}