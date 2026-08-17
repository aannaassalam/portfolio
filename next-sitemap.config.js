// next-sitemap.config.js
module.exports = {
  // The committed sitemap and robots.txt both shipped pointing at google.com,
  // because the fallback was the create-next-app placeholder and postbuild ran
  // without the env var. The real domain is the fallback now.
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN ?? "https://www.synkinnovations.in",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7
};
