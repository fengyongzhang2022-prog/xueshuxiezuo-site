const form = document.querySelector("#agentForm");
const output = document.querySelector("#agentOutput");
const sampleButton = document.querySelector("#sampleButton");
const fileInput = document.querySelector("#paperFile");
const fileStatus = document.querySelector("#fileStatus");
const sampleGrid = document.querySelector("#sampleGrid");
const shuffleSamples = document.querySelector("#shuffleSamples");
const sampleSelect = document.querySelector("#sampleSelect");
const loadSelectedSample = document.querySelector("#loadSelectedSample");
const ahaButton = document.querySelector("#ahaButton");
const quickDemoNav = document.querySelector("#quickDemoNav");
const aboutProject = document.querySelector("#aboutProject");
const projectDialog = document.querySelector("#projectDialog");
const diagnosisStatus = document.querySelector("#diagnosisStatus");
const healthScore = document.querySelector("#healthScore");
const healthBar = document.querySelector("#healthBar");
const healthNote = document.querySelector("#healthNote");
const disciplineButtons = document.querySelectorAll(".discipline-tags button");
const annotatedText = document.querySelector("#annotatedText");
const annotatedBody = document.querySelector("#annotatedBody");
const tabButtons = document.querySelectorAll(".report-tabs button");

const samples = [
  {
    id: "corpus-1",
    label: "语料1",
    title: "中韩两国非机动车市场比较",
    discipline: "国际中文教育 / 学习者论文",
    meta: "母语：韩语 · 性别：男 · HSK6",
    preview: "绪论从中国与韩国电动车市场现状展开，材料丰富，但背景信息较长，研究问题与比较目的需要进一步凸显。",
    text:
      "注：留学生同学为南京大学汉语言四年级学生，汉语水平为HSK6级，于2024年4月提交论文初稿。\n\n【语料1】\n母语：韩语  性别：男  题目：中韩两国非机动车市场比较\n\n0．绪论\n0.1 中韩两国电动车市场现状\n0.1.1 中国市场\n由于中国经济社会的不断发展，市民对公共交通形成了很大的需求，车辆拥有量迅速增长，但交通工具的相对匮乏以及管理的相对滞后，导致公共交通问题愈演愈烈。电动自行车以其便利、环保、经济等优点，越来越成为了现代生活中车速较低、使用停放方式简单、适应社会大众短途出游的一种交通工具。随着人民生活水平的改善和国家相关产业政策的推进，中国电动自行车工业也步入了一个全新的经济增长时代。数据表明，截止2020年末，中国的电动自行车社会保有量已突破3亿辆。\n\n目前电动自行车逐渐成为最主要的民生运输工具，用于普通市民的日常生活代步和消遣娱乐。随着中国城市化进程的日渐深入以及民众生活水平的日渐提升，人民对交通和生活水平也产生了更高的需求。近年来电动自行车的发展，有效减轻了短程旅行的城市交通压力，促进了现代道路交通系统的有序发展，同时电动自行车产业也得到了地方政府部门的普遍重视与支持。\n\n0.1.2 韩国市场\n韩国摩托车产业在政治环境的影响下开始并允许其产业特性发生变化。韩国摩托车产业作为一个产业确立并形成市场的时间一般被认为是通过1962年起基于起亚和本田的技术合作开始生产和销售的时期。从这个时间点开始，可以将韩国摩托车产业从历史发展的角度划分为几个阶段。韩国的电动车市场形成时间相对晚，2005年通过首尔首都圈内的电动两轮车试点供应商招募公告，首次有5家公司被选中进行试点供应。直到2020年疫情爆发，外卖市场迅速增长，也推动了电动车市场的增长。\n\n0.2 中韩两国电动车的定义\n根据中国《中华人民共和国道路交通安全法》，非机动车，是指以人力或者畜力驱动，上道路行驶的交通工具，以及虽有动力装置驱动但设计最高时速、空车质量、外形尺寸符合有关国家标准的电动自行车等交通工具。韩国《道路交通法》中对“车”“原动机装置自行车”和“个人移动装置”也有相关规定。综上，本文中的电动车是指，中国《中华人民共和国道路交通安全法》中的“非机动车”和韩国《道路交通法》中的“原动机装置自行车”。"
  },
  {
    id: "corpus-2",
    label: "语料2",
    title: "越南留学生汉语写作母语使用策略调查研究",
    discipline: "国际中文教育 / 学习者论文",
    meta: "母语：越南语 · 性别：女 · HSK6",
    preview: "引言包含研究背景、例句说明、研究不足与研究目标，适合展示系统如何识别研究空白和研究目的。",
    text:
      "注：留学生同学为南京大学汉语言四年级学生，汉语水平为HSK6级，于2024年4月提交论文初稿。\n\n【语料2】\n母语：越南语  性别：女  题目：越南留学生汉语写作母语使用策略调查研究\n\n第一章：绪论\n在本章中，本文将详细阐述研究的背景与动机，以及选择该研究课题的原因。此外，还将清晰概述本文的研究内容和研究思路，并旨在呈现本研究的重要意义。\n\n1.1 研究缘起和意义\n母语使用是指在学习第二语言的过程中，使用自己的母语来辅助理解和表达。母语可以帮助学习者更好地理解和解释第二语言的词汇、语法和语言规则。对学习汉语的越南留学生而言，母语使用情况同样十分普遍。使用母语的时候，尤其是在进行汉语写作的过程中，越南留学生很容易会受到自己母语的影响，可能会在词汇选择、语法结构、表达方式、语用习惯等方面存在一些偏差或错误。\n\n然而，在学习第二语言时使用母语并非完全是负面的，尤其是第二语言写作方面。母语是一个人最熟悉和流利的语言，使用母语可以帮助留学生更准确地表达自己的思想和观点，从而提高写作的质量和深度。关于留学生在汉语写作中的策略研究已经有很多成果，但是专门针对越南留学生汉语写作母语使用策略的研究相对较少，因此，本文以不同汉语水平的越南留学生为研究对象，针对他们在汉语写作过程中母语使用策略进行调查，并根据调查结果进行分析及归纳，最后为越南留学生汉语写作中提供实用的学习方法和策略。\n\n1.2 本文的研究目标与思路\n本文通过有声思维法及回顾性访谈法进行调查，考察不同汉语水平的越南留学生汉语写作中母语使用的情况、母语使用策略的效果，并且探讨影响越南留学生汉语写作母语使用的因素，同时提供有针对性的学习策略。首先，本文将收集相关的文献资料，包括已有的研究、学术论文、书籍等。其次，本文采用有声思维法和回顾性访谈法，邀请不同汉语水平的越南留学生参加汉语写作任务，并对调查结果进行梳理及分析。"
  },
  {
    id: "corpus-3",
    label: "语料3",
    title: "《山茶花开时》与《我的前半生》中的母亲形象比较",
    discipline: "国际中文教育 / 文学文化研究",
    meta: "母语：韩语 · 性别：女 · HSK6",
    preview: "文本背景阐释较充分，文献综述篇幅较长，适合展示系统如何判断引言比例和目的呈现是否清楚。",
    text:
      "注：留学生同学为南京大学汉语言四年级学生，汉语水平为HSK6级，于2024年4月提交论文初稿。\n\n【语料3】\n母语：韩语  性别：女  题目：《山茶花开时》与《我的前半生》中的母亲形象比较：韩中现代母亲转型的探索\n\n1 绪论\n1.1 研究缘起和意义\n随着全球化的深入发展和社会文化的快速变迁，性别角色和家庭价值观在世界范围内都经历了显著的转型。特别是在韩国和中国这样深受儒家文化影响的社会中，传统上对母亲角色的期望和认知正面临着前所未有的挑战和改变。本研究通过比较分析韩国电视剧《山茶花开时》与中国电视剧《我的前半生》中的母亲形象，旨在探索在现代社会背景下韩中两国母亲形象的转型，以及这种转型对性别角色、家庭价值观和社会文化的影响和意义。\n\n此外，通过对韩国和中国两个不同社会文化背景下的母亲形象进行比较分析，本研究旨在揭示儒家文化传统与现代社会价值之间的互动和影响，探讨在传统与现代、个人与社会之间寻找平衡的路径。这一过程不仅有助于深化我们对于性别角色变迁和家庭价值观更新的理解，也为促进性别平等、增强家庭和社会和谐提供了重要的理论和实践指导。\n\n1.2 国内外研究综述\n李红(2022)认为韩国家庭伦理剧中传统母亲形象分为家庭型、教诲型、权威型和苦难型。张玉(2022)认为韩国家庭伦理剧中传统母亲形象分为自立型母亲、慈爱型母亲和事业型母亲。朴贞雅（2019）认为韩国家庭伦理剧中现代母亲形象包括慈爱型母亲、独立型母亲和智慧型母亲。相关研究也对中国家庭伦理剧中的传统母亲形象和现代母亲形象进行了分类讨论。\n\n1.3 本文的研究目标与思路\n本文旨在通过比较分析韩国电视剧《山茶花开时》和中国电视剧《我的前半生》中所呈现的母亲形象，深入探究韩中两国传统母亲与现代母亲之间的转变与差异。本研究的目标不仅是揭示两国母亲形象的转型，更重要的是探索不同社会环境如何塑造出各具特色的母亲形象特点。"
  }
];

const sampleText = samples[1].text;

renderSamples();
setDashboard("idle");

sampleButton?.addEventListener("click", () => {
  applySample(samples[Math.floor(Math.random() * samples.length)]);
});

shuffleSamples?.addEventListener("click", () => {
  const sample = samples[Math.floor(Math.random() * samples.length)];
  sampleSelect.value = sample.id;
  applySample(sample);
});
loadSelectedSample?.addEventListener("click", () => {
  const sample = samples.find((item) => item.id === sampleSelect.value);
  if (sample) applySample(sample);
});
ahaButton?.addEventListener("click", runInstantDemo);
quickDemoNav?.addEventListener("click", runInstantDemo);
aboutProject?.addEventListener("click", () => projectDialog?.showModal());

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

disciplineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#discipline").value = button.textContent.trim();
  });
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
  output.innerHTML = makeLoadingPanels("正在读取论文并调用智能体诊断，请稍候...");
  setDashboard("loading");

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
    renderReport(data.reply);
    renderAnnotatedText(payload.manuscript || document.querySelector("#introduction").value);
    setDashboard("success");
  } catch (error) {
    output.classList.remove("loading");
    output.innerHTML = makeSinglePanel(`暂时无法生成回复：${escapeHtml(error.message)}`);
    setDashboard("error");
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

function renderSamples() {
  if (!sampleSelect) return;
  sampleSelect.innerHTML = samples
    .map((sample) => `<option value="${sample.id}">${sample.label}｜${escapeHtml(sample.title)}｜${escapeHtml(sample.meta)}</option>`)
    .join("");
}

function applySample(sample) {
  document.querySelector("#paperTitle").value = sample.title;
  document.querySelector("#discipline").value = sample.discipline;
  document.querySelector("#introduction").value = sample.text;
  if (sampleSelect) sampleSelect.value = sample.id;
  renderAnnotatedText(sample.text);
  setDashboard("sample");
  output.innerHTML = makeSinglePanel(`已填入${escapeHtml(sample.label)}，可以生成诊断报告。`);
}

function runInstantDemo() {
  const sample = samples[Math.floor(Math.random() * samples.length)];
  applySample(sample);
  output.classList.add("loading");
  output.innerHTML = makeLoadingPanels("已载入样例。正在识别引言部分...");
  setDashboard("loading");

  setTimeout(() => {
    output.innerHTML = makeLoadingPanels("已识别引言。正在检查背景铺垫、研究不足和研究目的...");
  }, 900);

  setTimeout(() => {
    form?.requestSubmit();
  }, 1600);
}

function setDashboard(state) {
  const states = {
    idle: {
      status: "等待输入",
      score: "--",
      width: "0%",
      note: "上传或粘贴论文后，系统会判断引言是否完成背景、文献、研究空白和研究目的的组织。"
    },
    sample: {
      status: "样例已载入",
      score: "预览",
      width: "28%",
      note: "你可以直接生成诊断报告，观察系统如何定位引言并提出修改建议。"
    },
    loading: {
      status: "诊断中",
      score: "...",
      width: "62%",
      note: "正在识别引言范围，并检查背景铺垫、文献回顾、研究不足和研究目的。"
    },
    success: {
      status: "诊断完成",
      score: "75%",
      width: "75%",
      note: "已生成诊断报告。分数是辅助提示，重点请看右侧反馈中的具体问题和修改建议。"
    },
    error: {
      status: "需要重试",
      score: "--",
      width: "12%",
      note: "诊断未完成。请检查文本长度、文件格式或稍后重试。"
    }
  };

  const current = states[state] || states.idle;
  if (diagnosisStatus) diagnosisStatus.textContent = current.status;
  if (healthScore) healthScore.textContent = current.score;
  if (healthBar) healthBar.style.width = current.width;
  if (healthNote) healthNote.textContent = current.note;
}

function renderAnnotatedText(text) {
  if (!annotatedText || !annotatedBody || !text?.trim()) return;
  const paragraphs = text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

  annotatedBody.innerHTML = paragraphs
    .map((paragraph, index) => {
      const tone = classifyTone(paragraph, index);
      return `<p class="annotated-line ${tone}" data-anchor="${index}">${escapeHtml(paragraph)}</p>`;
    })
    .join("");
  annotatedText.hidden = false;
}

function classifyTone(text, index) {
  if (/不足|较少|缺乏|尚未|有限|然而|但是|问题/.test(text)) return "gap";
  if (/本文|本研究|旨在|考察|探讨|分析|比较|调查/.test(text)) return "purpose";
  if (/研究|认为|指出|显示|文献|综述|李|张|王|朴|金/.test(text) && index > 1) return "literature";
  return "background";
}

function activateTab(tabName) {
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tabName));
  output.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function renderReport(reply) {
  const sections = splitReport(reply);
  output.innerHTML = `
    <section class="tab-panel active" data-panel="structure">
      ${renderStructurePanel(sections)}
    </section>
    <section class="tab-panel" data-panel="sentences">
      ${renderSentenceCards(sections.sentences || sections.full)}
    </section>
    <section class="tab-panel" data-panel="guidance">
      ${renderGuidancePanel(sections)}
    </section>
  `;
  activateTab("structure");
}

function splitReport(reply) {
  const parts = { full: reply };
  const lines = reply.split(/\n/);
  let current = "full";
  const buckets = {};
  lines.forEach((line) => {
    if (/引言识别|总体判断|结构诊断/.test(line)) current = "structure";
    if (/句级功能|逐句|句子摘要/.test(line)) current = "sentences";
    if (/修改建议|示例改写|Before|After|改写/.test(line)) current = "guidance";
    buckets[current] = `${buckets[current] || ""}\n${line}`;
  });
  return { ...parts, ...buckets };
}

function renderStructurePanel(sections) {
  return `
    <div class="structure-bars">
      <div><span>背景铺垫</span><strong>80%</strong><i style="--w:80%"></i></div>
      <div class="warn"><span>文献回顾</span><strong>40%</strong><i style="--w:40%"></i></div>
      <div class="danger"><span>研究空白</span><strong>25%</strong><i style="--w:25%"></i></div>
      <div><span>研究目的</span><strong>75%</strong><i style="--w:75%"></i></div>
    </div>
    ${renderMarkdownLite(sections.structure || sections.full)}
  `;
}

function renderSentenceCards(text) {
  const cleaned = text || "暂无逐句分析。";
  const items = cleaned
    .split(/\n+/)
    .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
    .filter((line) => line.length > 8)
    .slice(0, 10);
  return `<div class="sentence-cards">${items.map((item, index) => `<article><span>句 ${index + 1}</span><p>${escapeHtml(item)}</p></article>`).join("")}</div>`;
}

function renderGuidancePanel(sections) {
  return renderMarkdownLite(sections.guidance || sections.full);
}

function makeSinglePanel(message) {
  return `
    <section class="tab-panel active" data-panel="structure"><span>${message}</span></section>
    <section class="tab-panel" data-panel="sentences"></section>
    <section class="tab-panel" data-panel="guidance"></section>
  `;
}

function makeLoadingPanels(message) {
  return makeSinglePanel(message);
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
