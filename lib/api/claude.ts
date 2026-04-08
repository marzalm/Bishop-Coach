import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GameErrorData {
  fen: string;
  movePlayed: string;
  bestMove: string;
  evalBefore: number;
  evalAfter: number;
  lossInCentipawns: number;
}

export interface AnalysisResult {
  category: string;
  explanation: string;
  severity: "blunder" | "mistake" | "inaccuracy";
}

export async function analyzeGameErrors(
  errors: GameErrorData[],
  language: "en" | "fr" = "fr"
): Promise<AnalysisResult[]> {
  const errorsList = errors
    .map(
      (e, idx) =>
        `Error ${idx + 1}:
      FEN: ${e.fen}
      Move played: ${e.movePlayed}
      Best move: ${e.bestMove}
      Eval before: ${(e.evalBefore / 100).toFixed(2)}
      Eval after: ${(e.evalAfter / 100).toFixed(2)}
      Loss: ${e.lossInCentipawns} centipawns`
    )
    .join("\n\n");

  const prompt = `You are a chess expert analyzing player errors. 
Analyze these chess errors and categorize them.

${errorsList}

For each error, provide:
1. Category (tactical_mistake, positional_error, opening_theory, endgame_error, king_safety, tempo_loss, exchange_loss)
2. Brief explanation in ${language === "fr" ? "French" : "English"}
3. Severity based on centipawn loss

Respond in JSON format:
[
  {
    "errorIndex": 0,
    "category": "...",
    "explanation": "...",
    "severity": "blunder|mistake|inaccuracy"
  }
]`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Could not parse Claude response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing game errors:", error);
    throw new Error("Failed to analyze game errors with Claude");
  }
}

export async function generateWeaknessProfile(
  weaknesses: { category: string; count: number; severity: string }[],
  language: "en" | "fr" = "fr"
) {
  const weaknessText = weaknesses
    .map((w) => `- ${w.category}: ${w.count} errors (${w.severity})`)
    .join("\n");

  const prompt = `You are a chess coach. Based on these errors, provide:
1. Top 3 weaknesses to work on
2. Recommended practice focus
3. Brief personalized advice

Weaknesses:
${weaknessText}

Respond in ${language === "fr" ? "French" : "English"} in JSON format:
{
  "topWeaknesses": ["weakness1", "weakness2", "weakness3"],
  "focusArea": "...",
  "advice": "..."
}`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse Claude response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error generating weakness profile:", error);
    throw new Error("Failed to generate weakness profile");
  }
}
