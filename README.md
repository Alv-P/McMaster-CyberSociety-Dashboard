# McMaster CyberSociety Dashboard

A responsive Next.js site for McMaster CyberSociety, with events, student projects, an executive team, a CTF standings hub, and curated cybersecurity learning resources.

## Deploy on Vercel

This repository is ready to import as a Vercel project. Vercel automatically detects the Next.js framework and uses the included production build command.

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com/new), select **Add New → Project** and import the repository.
3. Leave the detected settings unchanged:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: leave blank
4. Select **Deploy**.

No environment variables are required. Subsequent pushes to the connected branch create deployments automatically; pull requests receive preview deployments.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify the deployment build locally:

```bash
npm run build
```

## Updating page content

Content lists live near the top of `pages/index.tsx`. Add entries to the announcements, projects, CTF events, or resources arrays. Each section is backed by a reusable manual pager, so page controls only appear once the display capacity is exceeded.
