
import { requireAuth } from "@/lib/utils/auth";
import { uploadAvatarToR2 } from "@/src/service/storage.service";


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

    if (!file) {
      return new Response("file is required", { status: 400 });
    }

    const fileName = await uploadAvatarToR2(file)

    return Response.json({
      success: true,
      fileName,
    });
  } catch (err) {
    console.error(err);
    return new Response("Upload failed", { status: 500 });
  }
}