const form = getElement("#postForm");
const postId = getElement("#postId");
const title = getElement("#title");
const body = getElement("#body");
const posts = getElement("#posts");
const statusElement = getElement("#status");
const formTitle = getElement("#formTitle");
const submitButton = getElement("#submitButton");
const cancelButton = getElement("#cancelButton");
const refreshButton = getElement("#refreshButton");

let currentPosts = [];

function getElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`${selector} element not found`);
  }
  return element;
}

function setStatus(message) {
  statusElement.textContent = message;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function resetForm() {
  postId.value = "";
  form.reset();
  formTitle.textContent = "새 글 작성";
  submitButton.textContent = "등록";
  cancelButton.hidden = true;
}

function editPost(id) {
  const post = currentPosts.find((item) => item.id === id);
  if (!post) {
    return;
  }

  postId.value = post.id;
  title.value = post.title;
  body.value = post.body;
  formTitle.textContent = "글 수정";
  submitButton.textContent = "저장";
  cancelButton.hidden = false;
  title.focus();
}

async function deletePost(id) {
  if (!confirm("이 글을 삭제할까요?")) {
    return;
  }

  const response = await fetch(`/posts/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("삭제에 실패했습니다.");
  }

  if (postId.value === id) {
    resetForm();
  }

  await loadPosts();
  setStatus("삭제했습니다");
}

function renderPosts() {
  if (currentPosts.length === 0) {
    posts.innerHTML = '<div class="empty">아직 게시글이 없습니다.</div>';
    return;
  }

  posts.replaceChildren(...currentPosts.map((post) => {
    const article = document.createElement("article");
    article.className = "post";

    const heading = document.createElement("h3");
    heading.className = "post-title";
    heading.textContent = post.title;

    const meta = document.createElement("div");
    meta.className = "post-meta";
    meta.textContent = `작성 ${formatDate(post.createdAt)} · 수정 ${formatDate(post.updatedAt)}`;

    const content = document.createElement("p");
    content.className = "post-body";
    content.textContent = post.body;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "secondary";
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => editPost(post.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "danger";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      deletePost(post.id).catch(showError);
    });

    actions.append(editButton, deleteButton);
    article.append(heading, meta, content, actions);
    return article;
  }));
}

async function loadPosts() {
  setStatus("불러오는 중");
  const response = await fetch("/posts");
  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  currentPosts = await response.json();
  renderPosts();
  setStatus(`${currentPosts.length}개의 글`);
}

async function savePost(payload, id) {
  return fetch(id ? `/posts/${id}` : "/posts", {
    method: id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

function showError(error) {
  setStatus(error instanceof Error ? error.message : "요청에 실패했습니다.");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = postId.value || undefined;
  const response = await savePost({
    title: title.value,
    body: body.value
  }, id);

  if (!response.ok) {
    const text = await response.text();
    setStatus(text || "저장에 실패했습니다.");
    return;
  }

  resetForm();
  await loadPosts();
  setStatus(id ? "저장했습니다" : "등록했습니다");
});

cancelButton.addEventListener("click", resetForm);
refreshButton.addEventListener("click", () => {
  loadPosts().catch(showError);
});

loadPosts().catch(showError);
