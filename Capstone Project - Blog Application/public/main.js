const form = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const excerptInput = document.getElementById("excerpt");
const contentInput = document.getElementById("content");
const postsContainer = document.getElementById("postsContainer");
function renderPost(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "card mb-4";
  postDiv.dataset.id = post.id;
  postDiv.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      ${post.excerpt ? `<h6 class="card-subtitle mb-2 text-muted">${post.excerpt}</h6>` : ""}
      <p class="card-text">${post.content}</p>
      <small class="text-secondary">Posted on ${new Date(post.date).toLocaleString()}</small>
      <div class="mt-2">
        <button class="btn btn-sm btn-warning edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </div>
    </div>
  `;
  postsContainer.prepend(postDiv);
  postDiv.querySelector(".delete-btn").addEventListener("click", async () => {
    await fetch(`/posts/${post.id}`, { method: "DELETE" });
    postDiv.remove();
  });
  postDiv.querySelector(".edit-btn").addEventListener("click", () => {
    titleInput.value = post.title;
    excerptInput.value = post.excerpt;
    contentInput.value = post.content;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const updatedPost = {
        title: titleInput.value,
        excerpt: excerptInput.value,
        content: contentInput.value
      };
      const res = await fetch(`/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost)
      });
      const data = await res.json();
      postDiv.querySelector(".card-title").textContent = data.title;
      postDiv.querySelector(".card-subtitle") ? postDiv.querySelector(".card-subtitle").textContent = data.excerpt : null;
      postDiv.querySelector(".card-text").textContent = data.content;
      form.reset();
      form.onsubmit = addPostHandler;
    };
  });
}
async function addPostHandler(e) {
  e.preventDefault();
  const postData = {
    title: titleInput.value,
    excerpt: excerptInput.value,
    content: contentInput.value
  };
  const res = await fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  });
  const newPost = await res.json();
  renderPost(newPost);
  form.reset();
}
form.addEventListener("submit", addPostHandler);

