export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Image generation failed");
    }

    const imageBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
