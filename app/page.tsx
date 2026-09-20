import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

export default async function Home() {
  const sb = await supabaseServer();

  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(9);

  // Always make sure posts is an array.
  const posts = data ?? [];

  return (
    <>
      <header className="nav">
        <Link className="brand" href="/">
          <i className="brand-mark" />
          The Learning Ledger
        </Link>

        <nav className="navlinks">
          <Link href="/">Home</Link>
          <Link href="#entries">Entries</Link>
          <Link href="/admin">Write</Link>
        </nav>

        <Link className="nav-btn" href="/admin">
          Open notebook →
        </Link>
      </header>

      <main>
        <section className="container hero">
          <div>
            <div className="eyebrow">
              A PERSONAL KNOWLEDGE JOURNAL
            </div>

            <h1>
              Things I learn.
              <br />
              <em>Things I build.</em>
              <br />
              Things I keep.
            </h1>

            <p className="lead">
              A visual notebook for my journey through cloud, AI,
              DevOps, projects and the lessons between the lines.
              No polished guru act — just useful notes from the desk.
            </p>

            <div className="actions">
              <Link className="btn primary" href="#entries">
                Start reading
              </Link>

              <Link className="btn" href="/admin">
                Write a note
              </Link>
            </div>
          </div>

          <div className="hero-art">
            <img
              src="/ledger-hero.png"
              alt="Coffee on a hand-drawn technical notebook"
            />

            <div className="hero-art-caption">
              FIELD NOTE / THE DESK / LEARN → BUILD → SHARE
            </div>
          </div>
        </section>

        <section className="container features">
          <div className="feature">
            <h3>Notebook first</h3>
            <p>
              Ideas become entries instead of disappearing into
              browser tabs.
            </p>
          </div>

          <div className="feature">
            <h3>Practical notes</h3>
            <p>
              Cloud, AI, DevOps, projects and the details that
              actually helped.
            </p>
          </div>

          <div className="feature">
            <h3>Built in public</h3>
            <p>
              Progress, mistakes and lessons — documented as they
              happen.
            </p>
          </div>
        </section>

        <section className="container section" id="entries">
          <div className="section-head">
            <div>
              <div className="eyebrow">RECENT ENTRIES</div>
              <h2>From the ledger</h2>
            </div>
          </div>

          <div className="grid">
            {posts.map((p: any, i: number) => (
              <Link
                className="card"
                href={`/posts/${p.slug}`}
                key={p.id}
              >
                <div className="cover">
                  <span className="num">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="tag">
                    {p.category || "NOTE"}
                  </span>
                </div>

                <div className="card-body">
                  <span className="date">
                    {p.published_at
                      ? new Date(p.published_at).toLocaleDateString(
                          "en-GB"
                        )
                      : "DRAFT"}
                  </span>

                  <h3>{p.title}</h3>

                  <p>{p.excerpt}</p>

                  <span className="read">
                    Read entry →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="admin-panel">
              <h3>Your ledger is empty.</h3>

              <p>
                Publish your first article from the notebook editor.
              </p>

              <Link className="back" href="/admin">
                Open the notebook →
              </Link>
            </div>
          )}
        </section>

        <section className="quote">
          <p>
            “Document the <span>journey</span>, not just the
            destination.”
          </p>
        </section>
      </main>

      <footer className="footer">
        <b>The Learning Ledger</b>

        <span>
          Built while learning · © {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
}