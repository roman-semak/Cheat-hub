import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma / libSQL out of the serverless bundle so they load natively.
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-libsql',
    '@libsql/client',
  ],
  // /docs/* pages read their Markdown from Docs/ at build time; make sure the
  // source file is traced into the serverless bundle as well.
  outputFileTracingIncludes: {
    '/docs/project-structure': ['./Docs/project-structure.md'],
  },
  // Old per-topic cheat sheets now live in the unified /quickref hub.
  async redirects() {
    return ['nextjs', 'leetcode', 'architecture', 'fullstack', 'git', 'ai'].map((slug) => ({
      source: `/${slug}/cheatsheet`,
      destination: `/quickref/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
