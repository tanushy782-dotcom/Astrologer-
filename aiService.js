/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – AI Logic (Text & Reasoning)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

import { translations } from '../i18n/translations';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Text Model: Specialized for reasoning and creative writing
const TEXT_MODEL = 'liquid/lfm-2.5-1.2b-thinking:free';

/* 
   🚨 STRICT SYSTEM PROMPT
   Enforces safety, tone, and structured output.
*/
const SYSTEM_PROMPT = `
You are a wise, empathetic, and spiritual AI guide named "Astra".
You provide insights based on palmistry, tarot, astrology, and spiritual philosophy.

CRITICAL RULES:
1. NEVER predict death, illness, disaster, lottery numbers, or specific legal outcomes.
2. NEVER give medical, financial, or legal advice. If asked, politely refuse and redirect to professionals.
3. DO NOT use fear-based language (e.g., "curse", "danger", "bad omen"). Use empowering language.
4. Tone: Calm, mystical, soothing, poetic, yet grounded and practical.
5. Focus on self-reflection, personal growth, potential, and mindfulness.
6. Format your responses with clear paragraphs. Use emojis sparingly to enhance the vibe.
7. Adapt your language to the user's selected language.

If the user asks about suicide or self-harm, provide immediate resources for help and stop the reading.
`;

/**
 * Generic OpenRouter API Call Wrapper
 */
async function callOpenRouter(messages) {
  if (!API_KEY) {
    throw new Error('Missing API Key. Please check .env file.');
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': 'AI Palm Reader', // Optional
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7, // Balance between creativity and coherence
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'AI Service Error');
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

export const aiService = {
  /**
   * Get Tarot Interpretation
   */
  async getTarotReading(cardName, category, context) {
    const prompt = `
      User Context: Name: ${context.name}, Language: ${context.language}.
      Task: Interpret the Tarot card "${cardName}" for the category "${category}".
      
      Structure:
      1. The Essence: Short poetic meaning of the card.
      2. The Guidance: How it applies to ${category}.
      3. Actionable Advice: One simple spiritual step they can take.
      
      Keep it under 150 words.
    `;
    return callOpenRouter([{ role: 'user', content: prompt }]);
  },

  /**
   * Get Horoscope
   */
  async getHoroscope(sign, context) {
    const prompt = `
      User Context: Name: ${context.name}, Sign: ${sign}, Language: ${context.language}.
      Task: Generate a daily horoscope.
      
      Structure:
      - Mood: 1 word
      - Love Energy: 1 sentence
      - Career Focus: 1 sentence
      - Spiritual Advice: Short paragraph (30-40 words).
    `;
    return callOpenRouter([{ role: 'user', content: prompt }]);
  },

  /**
   * Get Daily Guidance
   */
  async getDailyGuidance(context) {
    const prompt = `
      User Context: Name: ${context.name}, Language: ${context.language}.
      Task: Generate a general daily spiritual guidance reading.
      
      Include:
      - Today's Energy
      - What to Embrace
      - What to Avoid (gentle advice)
      - A lucky element (color, number, or crystal)
    `;
    return callOpenRouter([{ role: 'user', content: prompt }]);
  },

  /**
   * Chat with Spirit Guide
   */
  async chat(message, history, context) {
    // Format history for API
    const conversation = history.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));

    // Add current message
    conversation.push({
      role: 'user',
      content: `User (${context.name}): ${message}\n(Respond in ${context.language})`
    });

    return callOpenRouter(conversation);
  }
};
