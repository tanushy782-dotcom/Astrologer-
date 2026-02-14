/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – Vision AI Service
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Vision Model: Capable of analyzing images
const VISION_MODEL = 'allenai/molmo-2-8b:free';

/* 
   Palm Reading Specific Prompt
*/
const VISION_SYSTEM_PROMPT = `
You are an expert Palm Reader AI.
Your task is to analyze an image of a human palm.

You must identify:
1. Heart Line (Emotions)
2. Head Line (Intellect)
3. Life Line (Vitality)
4. Fate Line (Career/Path) - if visible.

OUTPUT FORMAT (JSON ONLY):
{
  "heartLine": "Description of length, curve, and depth...",
  "headLine": "Description of origin, slope, and length...",
  "lifeLine": "Description of curve, depth, and breaks...",
  "fateLine": "Description or 'Not clearly visible'...",
  "summary": "A warm spiritual summary of the hand's overall energy."
}

RULES:
- If the image is NOT a hand/palm, return {"error": "No palm detected"}.
- Be positive and empowering.
- NO medical diagnoses (e.g., do not say 'short life line means early death' - say 'indicates a need to preserve energy').
- Keep descriptions short (2 sentences max per line).
`;

export const visionService = {
  /**
   * Analyze Palm Image
   * @param {string} base64Image - The image in base64 format (including data:image/...)
   * @param {string} handSide - 'left' or 'right'
   * @param {object} context - User context (name, language)
   */
  async analyzePalm(base64Image, handSide, context) {
    if (!API_KEY) throw new Error('Missing API Key');

    const userPrompt = `
      Analyze this ${handSide} hand for ${context.name}. 
      Language: ${context.language}.
      Return ONLY valid JSON.
    `;

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: VISION_MODEL,
          messages: [
            {
              role: 'system',
              content: VISION_SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: userPrompt },
                { type: 'image_url', image_url: { url: base64Image } }
              ]
            }
          ],
          temperature: 0.1, // Low temp for structured JSON
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error('Vision API Error');
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content;

      // Extract JSON from potential markdown code blocks
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if model refuses JSON format (rare with low temp)
        return {
          error: "Analysis incomplete. Please try again with a clearer photo."
        };
      }

    } catch (error) {
      console.error('Vision Service Error:', error);
      throw error;
    }
  }
};
