
import { requireAuth } from "@/lib/utils/auth";
import { uploadAvatarToR2, deleteAvatarToR2 } from "@/src/service/storage.service";


/**
 * API機能
 * ファイルをアップロードする機能のみ
 * ファイルをアップロードする場所（Public or Private)
 * アップロードが成功したらファイルパスを払い出し
 * アップロードが失敗したらエラーを返す
 * 
 * 
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: Request) {

  // Token認証
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    const bucketType = formData.get("BucketType") as string | null;

    if (!file) {
      return new Response("file is required", { status: 400 });
    }

    const fileName = await uploadAvatarToR2(file)

    return Response.json({
      success: true,
      fileName,
      bucketType,
    });
  } catch (err) {
    console.error(err);
    return new Response("Upload failed", { status: 500 });
  }
}

// 削除 DELETE /notes/:id
export async function DELETE(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const { fileName } = body;

  if (!fileName) {
    return new Response("fileName is required", { status: 400 });
  }
  console.log(`deleteFile: ${JSON.stringify(fileName)}`);
  const result = await deleteAvatarToR2(fileName);

  if (!result) {
    return new Response("fileName not found", { status: 404 });
  }

  return Response.json({ success: true, deleted: result });
}