# NP - Blog

It is a web-based personal blog built with React 19 and Next.js 16

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16  |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Database | Neon Postgres (`neon-http` driver) |
| ORM | Drizzle ORM v2 |
| Validation | Zod |
| Forms | `useActionState` + `useFormStatus` (no client-side loading state) |

## Getting started

```bash
pnpm install
pnpm drizzle-kit generate    # generate SQL migration files into drizzle/ from lib/db/schema.ts
pnpm drizzle-kit migrate     # apply migrations to Neon
pnpm dev
```

Required environment variables (`.env.local`, never committed):

```
DATABASE_URL=postgres://...
POST_BLOG_PASSWORD=your-admin-password
```

### Seeding
To seed data on neon, I used the following:
- open Drizzle Studio (`pnpm studio`) and add data manually
  - only add data the following column
    **Posts Table**
      -  title
      -  slug : must be **lowercase**, **not** include special characters, based on **title name**, add **6 random alphanumeric characters** and whitespace == hypenated (-) 
      -  description : min(50) max (500)
      -  body : atleast 750 characters
      -  tags : array format ["",""] max of 5 tags
   
    **Comments Table**
      - authorName : min(1) and max(80) characters
      - body : min(10) max (2000) characters
## Project structure

```
app/
  page.tsx                     Landing page
  blog/
    page.tsx                   Post list (Server Component, PPR shell)
    loading.tsx                Skeleton list
    [slug]/
      page.tsx                 Single post + comments
      loading.tsx              Skeleton post
      comment-form.tsx         Client component, wraps addComment
      actions.ts                addComment Server Action
    new/
      page.tsx                 Admin "create post" form
      loading.tsx
      create-blog-form.tsx     Client component, wraps createPost
      action.ts                 createPost Server Action
components/
  ui/                          shadcn primitives 
  BlogCard.tsx, BlogListClient.tsx, BlogTheme.tsx,
  CommentCount.tsx, CommentItem.tsx, TagBadge.tsx, TagInput.tsx, TagCombobox.tsx
  Header.tsx, Footer.tsx, MobileNavBar.tsx
lib/
  db/
    index.ts                   drizzle() + neon() client
    schema.ts                  posts, comments tables + relations
    queries.ts                 getPostSummaries, getExistingTags, getCommentCount
  format.ts                    slugify, formatDate
  validations.ts                Zod schemas: createPostSchema, commentSchema
drizzle/                       Committed SQL migration files
```

## Data model

```ts
posts:    id (uuid, pk) · title · slug (unique) · description · body
          · tags (text[]) · createdAt
comments: id (uuid, pk) · postId (fk → posts.id, cascade delete)
          · authorName · body · createdAt
```


### Slug generation

`slugify(title)` (in `lib/format.ts`) turns a title into a URL-safe base
(`slugify-lib`, lowercased/hyphenated) and appends a random 6-character
suffix generated with `nanoid`, e.g. `my-first-post-k3j9pq`. Because
`posts.slug` is `unique()` in the schema, the random suffix guarantees two
posts with the same title never collide, without needing a
check-then-retry query against the database.

### Cache 
This project uses `updateTag`, not `revalidateTag`, at both call sites,
because both are read-your-own-writes cases:

- `createPost` calls `updateTag("post-tags")` and then `redirect()`s straight
  to the new post. If the tag list were only marked stale, the very page the
  author is redirected to could still render the old tag set for a moment.
- `addComment` calls `updateTag(\`comments-${postId}\`)` so the comment count
  updates in the same response cycle as the comment that was just posted,
  instead of showing a stale count first.

`revalidatePath` is also called after both mutations, to invalidate the
route-level cache for `/blog` and `/blog/[slug]` for everyone else visiting
those pages.

### Reads and "use cache"

Expensive, shared queries are wrapped with `"use cache"` and tagged so they
can be invalidated on demand:

- `getExistingTags()` — tagged `post-tags`, `cacheLife("minutes")`.
- `getCommentCount(postId)` — tagged `comments-${postId}`, `cacheLife("minutes")`.

`getPostSummaries()` is left uncached since the blog list page itself is the
PPR dynamic shell.
