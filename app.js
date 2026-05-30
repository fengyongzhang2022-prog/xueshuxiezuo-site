const form = document.querySelector("#agentForm");
const output = document.querySelector("#agentOutput");
const sampleButton = document.querySelector("#sampleButton");

const sampleText =
  "近年来，学术汉语写作能力逐渐成为国际中文教育研究的重要议题。已有研究主要关注学习者词汇、句法和篇章衔接等方面的问题，但对论文引言中研究空白如何建构的讨论仍相对有限。基于此，本文以中文期刊论文引言为参照，考察高级汉语学习者论文引言的语步结构特征，并提出相应的写作教学建议。";

sampleButton?.addEventListener("click", () => {
  document.querySelector("#paperTitle").value = "高级汉语学习者论文引言语步结构研究";
  document.querySelector("#discipline").value = "国际中文教育";
  document.querySelector("#introduction").value = sampleText;
  output.innerHTML = "<span>示例已填入，可以生成智能回复。</span>";
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    title: document.querySelector("#paperTitle").value.trim(),
    discipline: document.querySelector("#discipline").value.trim(),
    introduction: document.querySelector("#introduction").value.trim()
  };

  if (!payload.introduction) {
    output.innerHTML = "<span>请先粘贴需要诊断的引言文本。</span>";
    return;
  }

  output.classList.add("loading");
  output.innerHTML = "<span>正在调用智能体诊断，请稍候...</span>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "智能回复生成失败");
    }

    output.classList.remove("loading");
    output.innerHTML = renderMarkdownLite(data.reply);
  } catch (error) {
    output.classList.remove("loading");
    output.innerHTML = `<span>暂时无法生成回复：${escapeHtml(error.message)}</span>`;
  }
});

function renderMarkdownLite(text) {
  return escapeHtml(text)
    .replace(/^### (.*)$/gm, "<h4>$1</h4>")
    .replace(/^## (.*)$/gm, "<h4>$1</h4>")
    .replace(/^\- (.*)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hu])/s, "<p>")
    .concat("</p>");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
