# Git Workflow and Deployment Guide

This guide explains how to use Git to manage your website and deploy changes to GitHub Pages.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Local Development Workflow](#local-development-workflow)
3. [Committing Changes](#committing-changes)
4. [Deploying to GitHub Pages](#deploying-to-github-pages)
5. [Common Git Commands](#common-git-commands)
6. [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# 1. Make your content changes
# 2. Preview locally
hugo server

# 3. Build the site
hugo

# 4. Stage all changes
git add .

# 5. Commit with a message
git commit -m "Add new blog post"

# 6. Push to GitHub (deploys automatically)
git push origin main
```

## Local Development Workflow

### Step 1: Start the Development Server

```bash
hugo server
```

This starts a local server at `http://localhost:1313` that auto-reloads when you save changes.

**Options:**
- `hugo server -D` - Include draft posts
- `hugo server --disableFastRender` - Full rebuild on changes (use if you see issues)

### Step 2: Make Your Changes

Edit content files, add new posts/projects, update layouts, etc.

### Step 3: Preview Changes

Check your changes in the browser at `http://localhost:1313`

### Step 4: Stop the Server

Press `Ctrl+C` in the terminal when done

## Committing Changes

### Step 1: Check What Changed

```bash
git status
```

This shows:
- Modified files (files you changed)
- Untracked files (new files you added)
- Deleted files

Example output:
```
On branch main
Changes not staged for commit:
  modified:   hugo.toml
  modified:   content/posts/my-post.md

Untracked files:
  content/posts/new-post.md
```

### Step 2: Review Your Changes

```bash
git diff
```

This shows the exact lines changed in each file.

### Step 3: Stage Your Changes

Add specific files:
```bash
git add content/posts/my-new-post.md
git add static/images/photo.png
```

Or add everything:
```bash
git add .
```

**Note:** The `.` means "all files in current directory and subdirectories"

### Step 4: Commit with a Clear Message

```bash
git commit -m "Add blog post about Hugo setup"
```

**Good commit messages:**
- `"Add new project: Data Dashboard"`
- `"Update about page with new experience"`
- `"Fix typo in blog post"`
- `"Add tags to existing posts"`

**Bad commit messages:**
- `"Update"` (too vague)
- `"stuff"` (not descriptive)
- `"asdf"` (meaningless)

## Deploying to GitHub Pages

### Option 1: Build and Deploy (if using GitHub Actions)

```bash
# Build the site
hugo

# Stage, commit, and push
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will automatically deploy your site.

### Option 2: Manual Deployment to gh-pages Branch

If you're deploying the `public/` folder to a `gh-pages` branch:

```bash
# Build the site
hugo

# Navigate to public folder
cd public

# Initialize git if needed (first time only)
git init
git remote add origin https://github.com/yourusername/yourrepo.git

# Add all files
git add .

# Commit
git commit -m "Deploy website"

# Push to gh-pages branch
git push -f origin HEAD:gh-pages

# Go back to root
cd ..
```

### Option 3: Automatic Deployment Script

Create a `deploy.sh` script:

```bash
#!/bin/bash

# Build the site
echo "Building site..."
hugo

# Add changes to git
git add .

# Commit changes
msg="Rebuild site $(date)"
if [ -n "$*" ]; then
    msg="$*"
fi
git commit -m "$msg"

# Push to main branch
echo "Deploying to GitHub..."
git push origin main

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh "Your commit message"
```

## Common Git Commands

### Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log --oneline -5

# View changes in a specific commit
git show COMMIT_HASH
```

### Checking Status

```bash
# See what files changed
git status

# See what lines changed
git diff

# See staged changes
git diff --staged
```

### Undoing Changes

```bash
# Discard changes to a file (before staging)
git checkout -- filename

# Unstage a file (after 'git add')
git reset filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - USE WITH CAUTION
git reset --hard HEAD~1
```

### Working with Branches

```bash
# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# List all branches
git branch

# Merge branch into current branch
git merge feature-name

# Delete a branch
git branch -d feature-name
```

### Remote Operations

```bash
# View remote repositories
git remote -v

# Fetch changes from remote (doesn't merge)
git fetch origin

# Pull changes from remote (fetches and merges)
git pull origin main

# Push changes to remote
git push origin main

# Push new branch to remote
git push -u origin branch-name
```

## Troubleshooting

### Issue: Changes Not Showing Up

**Solution:**
```bash
# Clear Hugo's cache
hugo --gc

# Restart the server
hugo server
```

### Issue: Git Says "Nothing to Commit"

**Cause:** You haven't made any changes, or changes aren't staged.

**Solution:**
```bash
# Check status
git status

# Stage your changes
git add .

# Then commit
git commit -m "Your message"
```

### Issue: Git Push Rejected

**Cause:** Remote has changes you don't have locally.

**Solution:**
```bash
# Pull remote changes first
git pull origin main

# Resolve any conflicts if they appear
# Then push again
git push origin main
```

### Issue: Merge Conflict

**Cause:** Same file modified in different ways locally and remotely.

**Solution:**
```bash
# After git pull shows conflicts:
# 1. Open conflicted files (Git marks them with <<<<<<, ======, >>>>>>)
# 2. Manually edit to resolve conflicts
# 3. Remove the conflict markers
# 4. Stage the resolved files
git add conflicted-file.md

# 5. Complete the merge
git commit -m "Resolve merge conflict"

# 6. Push
git push origin main
```

### Issue: Accidentally Committed Wrong Files

**Solution:**
```bash
# If not pushed yet:
git reset --soft HEAD~1  # Undo commit, keep changes
# Fix your staging
git add correct-files
git commit -m "Correct commit message"

# If already pushed (creates a new commit that undoes the last one):
git revert HEAD
git push origin main
```

### Issue: Large File Rejected

**Cause:** GitHub has a 100MB file size limit.

**Solution:**
```bash
# Remove large file from commit
git rm --cached large-file.pdf

# Add to .gitignore
echo "large-file.pdf" >> .gitignore

# Compress or optimize the file
# Or host it elsewhere and link to it

# Commit the changes
git commit -m "Remove large file"
```

## Best Practices

1. **Commit Often:** Make small, focused commits rather than huge ones
2. **Write Clear Messages:** Future you will thank present you
3. **Test Locally First:** Always run `hugo server` before committing
4. **Don't Commit Secrets:** Never commit passwords, API keys, or private data
5. **Use .gitignore:** Exclude files that shouldn't be in version control
6. **Pull Before Push:** Get remote changes before pushing your changes
7. **Backup Important Data:** Git is not a backup system, keep separate backups

## .gitignore Recommendations

Your `.gitignore` file should include:

```
# Hugo
public/
resources/_gen/
.hugo_build.lock

# OS Files
.DS_Store
Thumbs.db

# Editor Files
.vscode/
.idea/
*.swp
*.swo

# Temporary Files
*.tmp
*~

# Large Files
*.mp4
*.mov
*.zip
*.tar.gz
```

## GitHub Pages Deployment Settings

### If Using GitHub Actions

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: "GitHub Actions"
4. Create `.github/workflows/hugo.yaml` (if not exists)

### If Using gh-pages Branch

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `gh-pages` / `root`

## Need Help?

- Git documentation: https://git-scm.com/doc
- GitHub Pages docs: https://docs.github.com/en/pages
- Hugo deployment guide: https://gohugo.io/hosting-and-deployment/

## Quick Reference Card

```bash
# Status & Info
git status              # Check status
git log --oneline       # View history
git diff                # See changes

# Making Changes
git add .               # Stage all changes
git commit -m "msg"     # Commit staged changes
git push origin main    # Push to GitHub

# Building & Deploying
hugo                    # Build site
hugo server             # Local development
git push origin main    # Deploy (if using Actions)

# Undoing
git checkout -- file    # Discard changes to file
git reset HEAD~1        # Undo last commit (keep changes)

# Updates
git pull origin main    # Get remote changes
```
