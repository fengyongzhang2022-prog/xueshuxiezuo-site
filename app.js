const form = document.querySelector("#agentForm");
const output = document.querySelector("#agentOutput");
const sampleButton = document.querySelector("#sampleButton");
const fileInput = document.querySelector("#paperFile");
const fileStatus = document.querySelector("#fileStatus");

const sampleText =
  "摘要：本研究关注高级汉语学习者学术写作能力的发展。\n\n引言\n近年来，学术汉语写作能力逐渐成为国际中文教育研究的重要议题。已有研究主要关注学习者词汇、句法和篇章衔接等方面的问题，但对论文引言中研究空白如何建构的讨论仍相对有限。基于此，本文以中文期刊论文引言为参照，考察高级汉语学习者论文引言的语步结构特征，并提出相应的写作教学建议。\n\n研究方法\n本研究选取学习者论文作为分析材料。";

sampleButton?.addEventListener("click", () => {
  document.querySelector("#paperTitle").value = "高级汉语学习者论文引言语步结构研究";
  document.querySelector("#discipline").value = "国际中文教育";
  document.querySelector("#introduction").value = sampleText;
  output.innerHTML = "<span>示例已填入，可以生成智能回复。</span>";
});

fileInput?.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (!file) {
    fileStatus.textContent = "支持 TXT、PDF、DOCX。文件越清晰，识别越稳定。";
    return;
  }

  const size = (file.size / 1024 / 1024).toFixed(2);
  fileStatus.textContent = `已选择：${file.name}（${size} MB）`;
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const file = fileInput?.files?.[0] || null;
  const payload = {
    title: document.querySelector("#paperTitle").value.trim(),
    discipline: document.querySelector("#discipline").value.trim(),
    manuscript: document.querySelector("#introduction").value.trim()
  };

  if (!payload.manuscript && !file) {
    output.innerHTML = "<span>请先上传论文原文，或粘贴需要诊断的论文文本。</span>";
    return;
  }

  output.classList.add("loading");
  output.innerHTML = "<span>正在读取论文并调用智能体诊断，请稍候...</span>";

  try {
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        throw new Error("文件超过 4MB，请压缩后上传，或复制引言文本到文本框。");
      }
      payload.file = await readFileAsBase64(file);
    }

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

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve({
        name: file.name,
        type: file.type,
        data: result.split(",")[1] || ""
      });
    };
    reader.onerror = () => reject(new Error("文件读取失败，请重试。"));
    reader.readAsDataURL(file);
  });
}

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
