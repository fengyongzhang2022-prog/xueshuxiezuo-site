import mammoth from "mammoth";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Only POST requests are supported." });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "DeepSeek API key is not configured." });
  }

  const { title = "", discipline = "", manuscript = "", file = null } = request.body || {};
  let manuscriptText = String(manuscript).trim();

  if (file?.data) {
    try {
      const extracted = await extractFileText(file);
      manuscriptText = [extracted, manuscriptText].filter(Boolean).join("\n\n");
    } catch (error) {
      return response.status(400).json({ error: error.message || "文件解析失败，请改为粘贴文本。" });
    }
  }

  const cleanManuscript = manuscriptText.trim();

  if (!cleanManuscript) {
    return response.status(400).json({ error: "请上传论文原文，或粘贴需要诊断的论文文本。" });
  }

  if (cleanManuscript.length > 18000) {
    return response.status(400).json({ error: "文本过长，请保留题名、摘要、引言及相邻小节后再提交。" });
  }

  const systemPrompt = [
    "你是“学术中文引言语步诊断与反馈智能体”。",
    "你的任务是从中文学术论文全文或片段中先识别引言部分，再依据 CARS 扩展标注框架 v0.4 对引言进行语步识别、结构诊断和修改建议生成。",
    "核心标签包括 M1-IMP、M1-BG、M1-LIT、M1-DEF、M1-THE、M2-GAP、M2-NEED、M2-EXT、M2-QUE、M2-CON、M2-REP、M3-PUR、M3-RQH、M3-MET、M3-MAT、M3-SCO、M3-DES、M3-FIN、M3-VAL、M3-NOV、M3-STR、M3-PROD。",
    "判断原则：先判断交际功能，再用引用、报告动词、评价词等形式线索验证；括号引用不自动等于文献回顾；研究空白必须指向已有研究、证据、知识状态或学术问题；学习者困难或现实问题通常不自动归为 M2。",
    "如果输入包含摘要、研究方法、文献综述、结论等非引言部分，请先排除非引言内容。",
    "输出中文，保持教师式、可操作、不过度替作者重写。"
  ].join("\n");

  const userPrompt = [
    `论文题名：${title || "未提供"}`,
    `学科方向：${discipline || "未提供"}`,
    "",
    "请先从以下论文原文或片段中识别引言部分，再诊断引言：",
    cleanManuscript,
    "",
    "请按以下结构输出。面向学习者时不要直接使用 M1/M2/M3 作为主要表达；如需提到术语，必须同时用中文解释。",
    "1. 引言识别：说明你识别出的引言范围；如果无法确定，请说明原因并使用最可能的引言段落。",
    "2. 总体判断：用 2 至 3 句话说明引言目前的主要优点和核心问题。",
    "3. 句级功能分析：按自然句列出句子摘要、主要功能、可选辅助功能和判断理由。功能名称请使用“背景铺垫、文献回顾、指出研究不足、说明研究目的、说明研究价值、说明研究方法”等学习者可理解的中文表达。",
    "4. 结构诊断：评价背景铺垫、文献回顾、研究不足或研究空白、研究目的之间是否充分、清楚、顺畅。",
    "5. 修改建议：给出 3 至 5 条可执行建议。",
    "6. 示例改写：只改写最需要修改的 1 至 2 句，并说明为什么这样改。"
  ].join("\n");

  try {
    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.2,
        max_tokens: 1800,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    const data = await deepseekResponse.json();

    if (!deepseekResponse.ok) {
      return response.status(deepseekResponse.status).json({
        error: data?.error?.message || "DeepSeek API request failed."
      });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return response.status(502).json({ error: "DeepSeek did not return content." });
    }

    return response.status(200).json({ reply });
  } catch (error) {
    return response.status(500).json({ error: error.message || "Unexpected server error." });
  }
}

async function extractFileText(file) {
  const name = String(file.name || "").toLowerCase();
  const buffer = Buffer.from(file.data, "base64");

  if (!buffer.length) {
    throw new Error("上传文件为空。");
  }

  if (name.endsWith(".txt") || file.type === "text/plain") {
    return buffer.toString("utf8");
  }

  if (name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const result = await pdfParse(buffer);
    return result.text;
  }

  throw new Error("暂不支持该文件格式。请上传 TXT、PDF 或 DOCX，或直接粘贴文本。");
}
