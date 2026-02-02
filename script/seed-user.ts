import { PrismaClient, UserRole, ColorThemeKey, AccountType } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "テストユーザー",
      role: UserRole.user,

      account: {
        create: {
          type: AccountType.credentials,
          themeMode: "light",
          colorThemes: ColorThemeKey.default,
        },
      },
    },
  });

  console.log("✅ User created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    //process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
