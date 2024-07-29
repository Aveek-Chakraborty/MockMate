/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://MockMate_owner:wMt8WAvrB2Ry@ep-old-heart-a10fgvxr.ap-southeast-1.aws.neon.tech/MockMate?sslmode=require',
    }
  };
  