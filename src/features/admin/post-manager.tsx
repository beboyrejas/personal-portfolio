import type { Post } from "@prisma/client";
import { deletePostAction, upsertPostAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

function PostForm({ post }: { post?: Post }) {
  return (
    <form action={upsertPostAction} className="space-y-3 rounded-3xl border border-ink/10 bg-white p-6">
      <input type="hidden" name="id" defaultValue={post?.id} />
      <input name="title" placeholder="Title" defaultValue={post?.title} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <input name="slug" placeholder="Slug" defaultValue={post?.slug} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <textarea name="excerpt" placeholder="Short summary" defaultValue={post?.excerpt} className="min-h-24 w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <textarea
        name="content"
        placeholder="Full post content"
        defaultValue={post?.content}
        className="min-h-48 w-full rounded-2xl border border-ink/10 px-4 py-3"
      />
      <input name="coverImage" placeholder="Cover image URL" defaultValue={post?.coverImage ?? ""} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        Published
      </label>
      <Button type="submit">{post ? "Update post" : "Create post"}</Button>
    </form>
  );
}

export function PostManager({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8">
      <PostForm />
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <PostForm post={post} />
            <form action={deletePostAction} className="flex items-start">
              <input type="hidden" name="id" value={post.id} />
              <Button type="submit" variant="ghost" className="text-red-600">
                Delete
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
