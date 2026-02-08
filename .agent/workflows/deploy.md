---
description: git
---

# Deploy to GitHub

This workflow commits all changes and pushes them to the GitHub repository.

## Usage
Call this workflow with `/deploy`. The AI will automatically generate a clear and descriptive commit message in English based on the staged changes.

## Steps

1. **Stage all changes**
   ```bash
   git add .
   ```
   // turbo

2. **Commit with an AI-generated message**
   Generate a clear, descriptive commit message in **English** that summarizes the changes accurately.
   ```bash
   git commit -m "<AI_GENERATED_MESSAGE>"
   ```
   Replace `<AI_GENERATED_MESSAGE>` with the message you generated.

3. **Push to GitHub**
   ```bash
   git push origin main
   ```
   // turbo

## Notes
- The working directory is: `/Users/luisdavid/Documents/Sitio Web/CRM/jucemaga-crm`
- Make sure `.env.local` is in `.gitignore` to avoid pushing secrets
- If push fails due to upstream changes, run `git pull --rebase origin main` first

## Example Full Flow
```bash
cd "/Users/luisdavid/Documents/Sitio Web/CRM/jucemaga-crm"
git add .
git commit -m "feat: implement AI chat widget with markdown support"
git push origin main
```


# Deploy to GitHub — LuisDavidMag.com

This workspace rule defines the **standard deployment flow** for the LuisDavidMag.com static website project.

The goal is:
- Zero friction deploys
- Clean, readable commit history
- No secrets leaked
- Compatible with static export for Hostinger

---

## Usage

Call this workflow with:



The AI must:
- Stage all changes
- Generate a **clear, descriptive commit message in English**
- Push safely to the `main` branch

No additional confirmation required unless conflicts occur.

---

## Preconditions (Hard Rules)

- `.env.local` **must be ignored**
- No build artifacts (`/out`, `/node_modules`) should be committed unless explicitly requested
- The project **must compile and build successfully** before pushing
- The branch to push is always: `main`

---

## Deployment Steps

### 1) Ensure correct working directory
```bash
cd "/Users/luisdavid/Documents/Sitio Web/luisdavidmag"