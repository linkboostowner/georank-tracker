import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(request) {
  try {
    const { url, keywords } = await request.json();
    if (!url || !keywords || !Array.isArray(keywords)) {
      return NextResponse.json({ error: 'URL and keywords array required' }, { status: 400 });
    }

    const prompt = `For each keyword in the following list: ${JSON.stringify(keywords)}. Determine if the website ${url} would appear in AI-generated search results (like ChatGPT, Perplexity). Return a JSON array of objects with keys: "keyword" (string), "appearing" (boolean), "snippet" (string or null), "position" (number or null). Only respond with the JSON array.`;

    const completion = await openai.chat.completions.create({
      model: 'openrouter/free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || '[]';
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const results = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}