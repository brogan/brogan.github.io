# Content Management Guide

This guide explains how to add and manage content on your Hugo Bear Blog website.

## Table of Contents

1. [Adding a New Blog Post](#adding-a-new-blog-post)
2. [Adding a New Project](#adding-a-new-project)
3. [Updating the About Page](#updating-the-about-page)
4. [Managing Images](#managing-images)
5. [Working with Tags](#working-with-tags)
6. [Updating Your CV](#updating-your-cv)
7. [Preview Changes Locally](#preview-changes-locally)

## Adding a New Blog Post

### Step 1: Create the File Using Hugo

Use the `hugo new` command to create a new post. Hugo will automatically populate the title and date using archetypes:

```bash
hugo new posts/my-post-title.md
```

**What happens automatically:**
- `title` is derived from the filename (hyphens become spaces, title-cased)
- `date` is set to the current date/time
- `tags` is provided as an empty array ready to fill in

**Example:**
```bash
hugo new posts/two-japanese-apps.md
```

Creates `content/posts/two-japanese-apps.md` with:

```toml
+++
title = 'Two Japanese Apps'
date = 2026-01-15T14:30:00+10:00
tags = []
+++
```

### Step 2: Edit Frontmatter (if needed)

The frontmatter is auto-generated but you can adjust it:

```toml
+++
title = 'Two Japanese Apps'
date = 2026-01-15
tags = ['japanese', 'ai', 'app']
+++
```

**Frontmatter fields:**
- `title`: Auto-generated from filename, edit if needed (required)
- `date`: Auto-set to creation time, adjust if backdating/scheduling (required)
- `tags`: Add relevant tags for categorization and filtering (optional)

**Note:** Hugo sorts posts by the `date` field in frontmatter, not by filename. You can adjust the date to control post ordering.

### Step 3: Write Your Content

Below the frontmatter, write your content using Markdown:

```markdown
## Section Heading

This is a paragraph with **bold** and *italic* text.

### Subsection

- Bullet point 1
- Bullet point 2

[Link text](https://example.com)

![Image alt text](/images/my-image.png)
```

### Step 4: Save and Preview

Save the file and run `hugo server` to preview locally at `http://localhost:1313`

## Adding a New Project

### Step 1: Create the Project File Using Hugo

Use the `hugo new` command to create a new project:

```bash
hugo new projects/my-awesome-project.md
```

**What happens automatically:**
- `title` is derived from the filename (hyphens become spaces, title-cased)
- `date` is set to the current date/time
- Template sections for Overview, Features, and Technical Implementation are included

**Example:**
```bash
hugo new projects/japanese-srs-app.md
```

Creates `content/projects/japanese-srs-app.md` with:

```toml
+++
title = 'Japanese Srs App'
date = 2026-01-15T14:30:00+10:00
thumbnail = '/images/projects/'
tech = []
summary = ''
+++

## Overview

## Features

## Technical Implementation
```

### Step 2: Complete the Frontmatter

Fill in the remaining fields:

```toml
+++
title = 'Japanese SRS App'
date = 2026-01-15
thumbnail = '/images/projects/srs-app-thumbnail.png'
tech = ['Python', 'Markdown', 'Spaced Repetition']
summary = 'A spaced repetition system that works from Markdown files.'
+++
```

**Project frontmatter fields:**
- `title`: Auto-generated, edit if needed (required)
- `date`: Project date for sorting (required)
- `thumbnail`: Path to thumbnail image (optional, but recommended)
- `tech`: Array of technologies used (optional)
- `summary`: Brief description shown in project grid (optional)

### Step 3: Write Project Details

Complete the template sections with your project details:

```markdown
## Overview

Detailed description of your project...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

Explain how you built it, challenges faced, solutions found...

## Screenshots

![Screenshot description](/images/projects/screenshot1.png)

## Results

What you achieved, lessons learned, etc.
```

### Step 4: Add Project Images

1. Save your project thumbnail (16:9 aspect ratio recommended)
2. Place it in `static/images/projects/`
3. Reference it in the frontmatter: `thumbnail: "/images/projects/your-image.png"`

## Updating the About Page

Edit `content/about.md` to update your bio, experience, and skills.

The CV link is automatically generated, just make sure `static/cv.pdf` exists.

## Managing Images

### Blog Images

1. Save images in `static/images/`
2. Create subdirectories for organization if needed
3. Reference in Markdown: `![Alt text](/images/your-image.png)`

### Project Images

1. Save project images in `static/images/projects/`
2. Use descriptive filenames
3. Optimize images for web (keep under 500KB)

### Image Optimization Tips

- Use PNG for screenshots, JPG for photos
- Resize images before uploading (max width: 1200px)
- Use compression tools like TinyPNG or ImageOptim
- For thumbnails, 800x450px (16:9) works well

## Working with Tags

### Adding Tags to Posts

In your post frontmatter:

```markdown
tags: ["hugo", "web-development", "tutorial"]
```

### Tag Best Practices

- Use lowercase, hyphenated tags: `web-development` not `Web Development`
- Be consistent with tag names across posts
- Don't create too many tags (reuse existing ones)
- Aim for 2-5 tags per post

### Viewing Posts by Tag

Tags automatically appear:
- At the bottom of each blog post as clickable links
- In the tag filter section on the blog list page

Clicking a tag shows all posts with that tag.

## Updating Your CV

1. Save your CV as a PDF file
2. Replace the file at `static/cv.pdf`
3. The link in the About page will automatically work

## Preview Changes Locally

### Start the Development Server

```bash
hugo server
```

Or to include draft posts:

```bash
hugo server -D
```

### View Your Site

Open your browser to: `http://localhost:1313`

The server auto-reloads when you save changes.

### Stop the Server

Press `Ctrl+C` in the terminal

## File Structure Reference

```
brogan.github.io/
├── archetypes/                # Templates for hugo new
│   ├── default.md             # Default template
│   ├── posts.md               # Blog post template
│   └── projects.md            # Project template
├── content/
│   ├── _index.md              # Homepage
│   ├── about.md               # About page
│   ├── posts/                 # Blog posts
│   │   ├── _index.md          # Posts section page
│   │   └── post-title.md      # Individual posts
│   └── projects/              # Projects
│       ├── _index.md          # Projects section page
│       └── project-name.md    # Individual projects
├── static/
│   ├── cv.pdf                 # Your CV
│   └── images/
│       └── projects/          # Project images
└── hugo.toml                  # Site configuration
```

## Markdown Syntax Quick Reference

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**bold text**
*italic text*

[link text](https://example.com)

![image alt text](/images/image.png)

- Unordered list item
- Another item

1. Ordered list item
2. Another item

> Blockquote

`inline code`

\`\`\`
code block
\`\`\`
```

## Need Help?

- Hugo documentation: https://gohugo.io/documentation/
- Markdown guide: https://www.markdownguide.org/
- Bear Blog theme: https://github.com/janraasch/hugo-bearblog
