export function parseGeminiResponse(responseText: string): any {
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { error: "No valid JSON found in response" };
  } catch (error) {
    return { error: "Invalid JSON format", details: (error as Error).message };
  }
}