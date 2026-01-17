import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Upsert helper function
  const upsert = async <T extends Record<string, unknown>>(
    model: {
      upsert: (args: { where: Record<string, unknown>; update: T; create: T }) => Promise<unknown>;
    },
    where: Record<string, unknown>,
    data: T
  ) => {
    await model.upsert({ where, update: data, create: data });
  };

  // ========================================================================
  // Seed App Settings
  // ========================================================================
  console.log('📝 Seeding app settings...');
  
  await Promise.all([
    upsert(
      prisma.appSetting,
      { key: 'app_name' },
      {
        key: 'app_name',
        value: '{{APP_TITLE}}',
        description: 'Application display name',
        isActive: true,
      }
    ),
    upsert(
      prisma.appSetting,
      { key: 'app_version' },
      {
        key: 'app_version',
        value: '1.0.0',
        description: 'Current application version',
        isActive: true,
      }
    ),
    upsert(
      prisma.appSetting,
      { key: 'maintenance_mode' },
      {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Enable maintenance mode',
        isActive: true,
      }
    ),
  ]);

  // ========================================================================
  // Seed Demo User (Development only)
  // ========================================================================
  if (process.env.NODE_ENV !== 'production') {
    console.log('👤 Seeding demo user...');
    
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        name: 'Demo User',
      },
    });

    // Seed demo posts
    console.log('📄 Seeding demo posts...');
    
    await Promise.all([
      prisma.post.upsert({
        where: { id: 'demo-post-1' },
        update: {},
        create: {
          id: 'demo-post-1',
          title: 'Welcome to {{APP_TITLE}}',
          content: 'This is a demo post to showcase the template features.',
          published: true,
          authorId: demoUser.id,
        },
      }),
      prisma.post.upsert({
        where: { id: 'demo-post-2' },
        update: {},
        create: {
          id: 'demo-post-2',
          title: 'Getting Started Guide',
          content: 'Learn how to use this Next.js template effectively.',
          published: true,
          authorId: demoUser.id,
        },
      }),
    ]);
  }

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });