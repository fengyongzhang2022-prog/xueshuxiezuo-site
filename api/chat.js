export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Only POST requests are supported." });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "DeepSeek API key is not configured." });
  }

  const { title = "", discipline = "", introduction = "" } = request.body || {};
  const cleanIntroduction = String(introduction).trim();

  if (!cleanIntroduction) {
    return response.status(400).json({ error: "请提供需要诊断的引言文本。" });
  }

  if (cleanIntroduction.length > 6000) {
    return response.status(400).json({ error: "文本过长，请先压缩到 6000 字以内。" });
  }

  const systemPrompt = [
    "你是“学术中文引言语步诊断与反馈智能体”。",
    "你的任务是依据 CARS 扩展标注框架 v0.4，对中文学术论文引言进行语步识别、结构诊断和修改建议生成。",
    "核心标签包括 M1-IMP、M1-BG、M1-LIT、M1-DEF、M1-THE、M2-GAP、M2-NEED、M2-EXT、M2-QUE、M2-CON、M2-REP、M3-PUR、M3-RQH、M3-MET、M3-MAT、M3-SCO、M3-DES、M3-FIN、M3-VAL、M3-NOV、M3-STR、M3-PROD。",
    "判断原则：先判断交际功能，再用引用、报告动词、评价词等形式线索验证；括号引用不自动等于文献回顾；研究空白必须指向已有研究、证据、知识状态或学术问题；学习者困难或现实问题通常不自动归为 M2。",
    "输出中文，保持教师式、可操作、不过度替作者重写。"
  ].join("\n");

  const userPrompt = [
    `论文题名：${title || "未提供"}`,
    `学科方向：${discipline || "未提供"}`,
    "",
    "请诊断以下引言：",
    cleanIntroduction,
    "",
    "请按以下结构输出：",
    "1. 总体判断：用 2 至 3 句话说明引言目前的主要优点和核心问题。",
    "2. 语步识别表：按自然句列出句子摘要、主标签、可选次标签和判断理由。",
    "3. 结构诊断：分别评价 M1、M2、M3 是否充分、顺序是否顺畅。",
    "4. 修改建议：给出 3 至 5 条可执行建议。",
    "5. 示例改写：只改写最需要修改的 1 至 2 句，并说明为什么这样改。"
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
