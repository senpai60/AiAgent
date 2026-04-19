import {
  geminiResponseService,
  geminiStreamResponseService,
} from "../service/gemini.service.js";

export const getAiResponse = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    const response = await geminiResponseService(prompt);
    return res
      .status(200)
      .json({ message: "Prompt received", success: true, data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get response from AI" });
  }
};

export const getAiStreamResponse = async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const stream = await geminiStreamResponseService(prompt);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${text}\n\n`);
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get response from AI" });
  }
};
