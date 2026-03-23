/**
 * AI image generation prompt templates for each character.
 *
 * Style guide: warm, friendly, Swedish café aesthetic. Characters should feel
 * like cozy illustrations from a children's book — approachable, not childish.
 * Consistent style across all 7 so they feel like a set you'd want to collect.
 *
 * Recommended settings:
 * - Style: soft watercolor / gouache illustration
 * - Aspect ratio: 1:1 (square, for the circular avatar frame)
 * - No text in the image
 */

const BASE_STYLE =
  "Warm gouache illustration, soft textures, cozy Scandinavian café palette, round friendly shapes, children's book style but sophisticated, no text, square format, white background";

export const imagePrompts: Record<number, string> = {
  1: `${BASE_STYLE}. A friendly bull character sitting by a café window, looking out at passersby. Warm terracotta and cream tones. Wearing a tiny knitted scarf. A kanelbulle (cinnamon bun) on the table beside him. Gentle expression, soft eyes.`,

  2: `${BASE_STYLE}. A tiny brave mouse character in a café, standing on a table surrounded by crumbs. Sage green and warm brown tones. Wearing a miniature baker's hat. Dreamy expression, looking up at an enormous cinnamon bun. Flour dust in the air.`,

  3: `${BASE_STYLE}. A curious crow character perched on a café chair, leaning in to listen. Deep navy and slate blue tones. Holding a tiny notebook and pencil. Thoughtful, observant expression. Coffee cups in soft focus around it.`,

  4: `${BASE_STYLE}. A whimsical artist character (small humanoid creature) painting at a café table using coffee as paint. Golden yellow and warm brown tones. Surrounded by tiny coffee-stained canvases. Joyful, messy, creative energy.`,

  5: `${BASE_STYLE}. A wise owl character reading a morning newspaper at a café. Muted purple and lavender tones. Round spectacles, a cup of coffee beside it. Cozy, knowledgeable expression. Morning light filtering in.`,

  6: `${BASE_STYLE}. A mysterious backpack character (an anthropomorphic rucksack with eyes and tiny legs) at a café. Dusty rose and burgundy tones. The backpack is slightly open, revealing a flower and the edge of a book. Playful, surprising.`,

  7: `${BASE_STYLE}. An adorable cupcake character with tiny arms and a sweet smile, sitting at a café table sharing treats. Soft pink and cream tones. Surrounded by scattered sprinkles. Radiating warmth and generosity.`,
};
