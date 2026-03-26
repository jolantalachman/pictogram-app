import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import OpenAI from 'openai';

const groqApiKey = defineSecret('GROQ_API_KEY');

const DEFAULT_PROMPT = `Create exactly one clear, grammatically correct sentence or question using ONLY the provided words.
Do NOT:
- add unrelated words
- refer to previous sentences
- explain anything
- include extra text.`;

const MAX_INPUT_LENGTH = 200;

function sanitizeInput(input: string): string {
  return input
    .replace(/[^\p{L}\p{N}\s.,?!-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

export const generateSentence = onCall(
  {
    secrets: [groqApiKey],
    region: 'europe-central2',
  },
  async request => {
    try {
      const { inputWords, language, prompt } = request.data as any;

      if (!inputWords || typeof inputWords !== 'string') {
        throw new HttpsError('invalid-argument', 'Invalid input');
      }

      const sanitizedInput = sanitizeInput(inputWords);

      if (!sanitizedInput) {
        throw new HttpsError('invalid-argument', 'Empty input');
      }

      const finalPrompt =
        prompt && prompt.length < 1000 ? prompt : DEFAULT_PROMPT;

      const openai = new OpenAI({
        apiKey: groqApiKey.value(),
        baseURL: 'https://api.groq.com/openai/v1',
      });

      const completion = await openai.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content: finalPrompt,
          },
          {
            role: 'user',
            content: `Language: ${language}\nWords: ${sanitizedInput}`,
          },
        ],
      });

      return {
        result: completion.choices?.[0]?.message?.content?.trim() || null,
      };
    } catch (error: any) {
      throw new HttpsError('internal', error.message || 'Something went wrong');
    }
  }
);
