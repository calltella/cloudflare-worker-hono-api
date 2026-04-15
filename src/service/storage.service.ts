
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
