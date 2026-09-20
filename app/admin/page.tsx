"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

type FormState = {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  published: boolean;
  image_url: string;
};

type Post = {
  id: number;
  title: string;
  category: string;
  published: boolean;
  slug: string;
};

const emptyForm: FormState = {
  title: "",
  excerpt: "",
  category: "Cloud",
  content: "",
  published: true,
  image_url: "",
};

export default function Admin() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState<FormState>(emptyForm);
  const [posts, setPosts] = useState<Post[]>([]);

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  // Check login session
  useEffect(() => {
    async function checkSession() {
      const result = await supabase.auth.getSession();
      setSession(result.data.session);
    }

    checkSession();

    const authListener = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  // Load posts after login
  useEffect(() => {
    if (session) {
      loadPosts();
    }
  }, [session]);

  async function loadPosts() {
    try {
      const response = await fetch("/api/posts");

      if (!response.ok) {
        setMessage("Could not load your posts.");
        return;
      }

      const result = await response.json();

      setPosts(result.posts || []);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    }
  }

  // Login
  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("Signing in...");

    const result = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("");
  }

  // Upload cover image
  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("Uploading image...");

    try {
      const extension =
        file.name.split(".").pop() || "jpg";

      const filePath =
        crypto.randomUUID() + "." + extension;

      const uploadResult = await supabase.storage
        .from("post-images")
        .upload(filePath, file, {
          upsert: false,
        });

      if (uploadResult.error) {
        setMessage(uploadResult.error.message);
        return;
      }

      const publicResult = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      setForm(function (current) {
        return {
          ...current,
          image_url: publicResult.data.publicUrl,
        };
      });

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Image upload failed.");
    }
  }

  // Create post
  async function handleSave(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setBusy(true);
    setMessage("Saving...");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result.error || "Could not save the post."
        );
        return;
      }

      setMessage(
        "Published: " + result.post.slug
      );

      setForm(emptyForm);

      await loadPosts();
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  // Delete post
  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("Deleting...");

    try {
      const response = await fetch(
        "/api/posts?id=" + id,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setMessage("Delete failed.");
        return;
      }

      setMessage("Post deleted successfully.");

      await loadPosts();
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    }
  }

  // Sign out
  async function handleSignOut() {
    await supabase.auth.signOut();

    setSession(null);
    router.refresh();
  }

  // ----------------------------------------
  // LOGIN PAGE
  // ----------------------------------------

  if (!session) {
    return (
      <main className="login">
        <div className="eyebrow">
          PRIVATE NOTEBOOK
        </div>

        <h1>Editor login</h1>

        <p className="lead">
          Sign in with your Supabase account to
          manage the ledger.
        </p>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={function (event) {
                setEmail(event.target.value);
              }}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={function (event) {
                setPassword(event.target.value);
              }}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="btn orange"
            type="submit"
          >
            Enter the notebook
          </button>

          {message && (
            <p className="error">
              {message}
            </p>
          )}
        </form>
      </main>
    );
  }

  // ----------------------------------------
  // ADMIN EDITOR
  // ----------------------------------------

  return (
    <div className="admin-shell">
      <header className="nav">
        <Link className="brand" href="/">
          <i className="brand-mark" />
          The Learning Ledger
        </Link>

        <div
          className="actions"
          style={{ margin: 0 }}
        >
          <button
            className="icon-btn"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>

          <Link
            className="back"
            href="/"
          >
            View site →
          </Link>
        </div>
      </header>

      <main className="admin">
        <div className="adminbar">
          <div>
            <div className="eyebrow">
              EDITOR
            </div>

            <h1>Write a new entry</h1>
          </div>
        </div>

        {message && (
          <div className="notice">
            {message}
          </div>
        )}

        <form
          className="admin-panel"
          onSubmit={handleSave}
        >
          <div className="field">
            <label htmlFor="title">
              Title
            </label>

            <input
              id="title"
              className="input"
              value={form.title}
              onChange={function (event) {
                setForm({
                  ...form,
                  title: event.target.value,
                });
              }}
              placeholder="What did you learn today?"
              required
            />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                className="select"
                value={form.category}
                onChange={function (event) {
                  setForm({
                    ...form,
                    category: event.target.value,
                  });
                }}
              >
                <option value="Cloud">
                  Cloud
                </option>

                <option value="AI">
                  AI
                </option>

                <option value="DevOps">
                  DevOps
                </option>

                <option value="Projects">
                  Projects
                </option>

                <option value="Career">
                  Career
                </option>

                <option value="Life">
                  Life
                </option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="cover-image">
                Cover image
              </label>

              <input
                id="cover-image"
                className="input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {form.image_url && (
                <small
                  style={{
                    color: "#8fa48b",
                  }}
                >
                  Uploaded ✓
                </small>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="excerpt">
              Excerpt
            </label>

            <input
              id="excerpt"
              className="input"
              value={form.excerpt}
              onChange={function (event) {
                setForm({
                  ...form,
                  excerpt: event.target.value,
                });
              }}
              placeholder="A short description of this entry..."
            />
          </div>

          <div className="field">
            <label htmlFor="content">
              Markdown content
            </label>

            <textarea
              id="content"
              className="textarea"
              value={form.content}
              onChange={function (event) {
                setForm({
                  ...form,
                  content: event.target.value,
                });
              }}
              placeholder="## What I learned

Write your story here...

### Example

This is something I learned while working on my project.

Use Markdown for headings, lists, links and code."
              required
            />
          </div>

          <div className="actions">
            <label>
              <input
                type="checkbox"
                checked={form.published}
                onChange={function (event) {
                  setForm({
                    ...form,
                    published:
                      event.target.checked,
                  });
                }}
              />{" "}
              Publish immediately
            </label>

            <button
              className="btn orange"
              type="submit"
              disabled={busy}
            >
              {busy
                ? "Saving..."
                : "Publish entry"}
            </button>
          </div>
        </form>

        <h2 style={{ marginTop: 60 }}>
          Your entries
        </h2>

        <div className="posts-admin">
          {posts.length === 0 ? (
            <div className="admin-panel">
              <p>
                No entries yet. Write your first
                article above.
              </p>
            </div>
          ) : (
            posts.map(function (post) {
              return (
                <div
                  className="admin-post"
                  key={post.id}
                >
                  <div>
                    <b>{post.title}</b>

                    <br />

                    <small>
                      {post.category} ·{" "}
                      {post.published
                        ? "Published"
                        : "Draft"}
                    </small>
                  </div>

                  <button
                    className="icon-btn"
                    type="button"
                    onClick={function () {
                      handleDelete(post.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
