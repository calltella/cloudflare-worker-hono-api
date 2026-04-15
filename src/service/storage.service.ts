
import { getR2 } from "@/lib/utils/r2";
import { randomUUID } from "crypto";

export async function uploadAvatarToR2(
  file: File
): Promise<string> {
  const ext = file.type === "image/png" ? "png" : "jpg";
  const fileName = `avatar_${randomUUID()}.${ext}`;

  const r2 = await getR2("public");

  await r2.put(`avatars/${fileName}`, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  return fileName; // ← DBにはフルURLではなくパスのみ保存
}

const DEFAULT_AVATAR = "default.png";

export async function deleteAvatarToR2(
  fileName: string | null | undefined
): Promise<boolean> {
  try {
    // ✅ 無効値ガード
    if (!fileName) return false;

    // ✅ default画像は削除しない
    if (fileName === DEFAULT_AVATAR) {
      console.log("Skip delete: default avatar");
      return false;
    }

    const r2 = await getR2("public");

    const key = `avatars/${fileName}`;

    await r2.delete(key);

    return true;
  } catch (error) {
    console.error("R2 delete error:", error);
    return false;
  }
}