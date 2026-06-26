/**
 * ============================================================
 * FRONTEND LOGIC — app.js
 * ============================================================
 * Role: Frontend Developer
 *
 * Responsibility: Fetch the top posts from the Backend API and
 * render them into the page.
 *
 * This file talks to ONE place: the backend API at API_BASE_URL.
 * It does NOT know about SQLite, SQLAlchemy, or Lobsters' JSON
 * format — by the time data reaches this file, the backend has
 * already cleaned and formatted it.
 *
 * Flow:
 *   1. Page loads → fetchTopPosts() runs automatically
 *   2. fetchTopPosts() calls the API → gets JSON back
 *   3. renderPosts() turns that JSON into HTML on the page
 *   4. If something goes wrong, showError() displays a message
 * ============================================================
 */

const API_BASE_URL = "http://localhost:5000";

// ─────────────────────────────────────────────
// DOM REFERENCES
// ─────────────────────────────────────────────

const postListEl = document.getElementById("post-list");
const stateMessageEl = document.getElementById("state-message");

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Formats a Unix timestamp (seconds) into a readable date string.
 * Example: 1716000000 → "May 18, 2024"
 */
function formatDate(unixSeconds) {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Shows a message in the state-message area (loading / error / empty).
 * Pass isError = true to apply the red error styling.
 */
function setStateMessage(text, isError = false) {
  stateMessageEl.textContent = text;

  if (isError) {
    stateMessageEl.classList.add("error");
  } else {
    stateMessageEl.classList.remove("error");
  }

  if (text === "") {
    stateMessageEl.style.display = "none";
  } else {
    stateMessageEl.style.display = "";
  }
}

// ─────────────────────────────────────────────
// RENDERING
// ─────────────────────────────────────────────

/**
 * Builds the HTML for a SINGLE post and returns it as a string.
 */
function buildPostHTML(post, rank) {
  return `
    <li class="post-item">
      <div class="post-rank">${rank}</div>
      <div class="post-body">
        <a class="post-title" href="${post.url}" target="_blank" rel="noopener">
          ${post.title}
        </a>
        <div class="post-meta">
          <span>${post.score} points</span>
          <span>by ${post.author}</span>
          <span>${formatDate(post.created_utc)}</span>
          <a href="${post.permalink}" target="_blank" rel="noopener">
            ${post.num_comments} comments
          </a>
        </div>
      </div>
    </li>
  `;
}

/**
 * Renders the full list of posts into the page.
 */
function renderPosts(posts) {
  if (posts.length === 0) {
    setStateMessage("No posts found. Has the pipeline been run yet?");
    return;
  }

  setStateMessage("");

  const html = posts.map((post, index) => buildPostHTML(post, index + 1)).join("");
  postListEl.innerHTML = html;
}

// ─────────────────────────────────────────────
// DATA FETCHING
// ─────────────────────────────────────────────

/**
 * Fetches the top posts from the backend API and renders them.
 * Handles loading and error states along the way.
 */
async function fetchTopPosts() {
  setStateMessage("Loading posts...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/top?limit=10`);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      renderPosts(result.data);
    } else {
      setStateMessage(result.error || "Something went wrong.", true);
    }
  } catch (error) {
    console.error(error);
    setStateMessage(
      "Could not reach the API. Is the backend server running on port 5000?",
      true
    );
  }
}

// ─────────────────────────────────────────────
// RUN ON PAGE LOAD
// ─────────────────────────────────────────────

fetchTopPosts();
renderPosts([
  {
    post_id: "abc123",
    title: "Test Post",
    author: "testuser",
    score: 100,
    num_comments: 10,
    url: "https://example.com",
    permalink: "https://lobste.rs/s/abc123",
    created_utc: 1716000000
  }
]);