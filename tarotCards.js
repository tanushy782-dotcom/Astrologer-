/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – Tarot Card Data
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const tarotCards = [
  { id: 0, name: "The Fool", symbol: "🤹", keywords: ["New Beginnings", "Innocence", "Leap of Faith"] },
  { id: 1, name: "The Magician", symbol: "🪄", keywords: ["Manifestation", "Power", "Action"] },
  { id: 2, name: "The High Priestess", symbol: "📜", keywords: ["Intuition", "Mystery", "Subconscious"] },
  { id: 3, name: "The Empress", symbol: "👑", keywords: ["Fertility", "Nature", "Abundance"] },
  { id: 4, name: "The Emperor", symbol: "🏰", keywords: ["Authority", "Structure", "Control"] },
  { id: 5, name: "The Hierophant", symbol: "⛪", keywords: ["Tradition", "Beliefs", "Conformity"] },
  { id: 6, name: "The Lovers", symbol: "💞", keywords: ["Partnership", "Union", "Choices"] },
  { id: 7, name: "The Chariot", symbol: "🛒", keywords: ["Willpower", "Victory", "Determination"] },
  { id: 8, name: "Strength", symbol: "🦁", keywords: ["Courage", "Persuasion", "Influence"] },
  { id: 9, name: "The Hermit", symbol: "🔦", keywords: ["Soul Searching", "Introspection", "Solitude"] },
  { id: 10, name: "Wheel of Fortune", symbol: "🎡", keywords: ["Karma", "Cycles", "Destiny"] },
  { id: 11, name: "Justice", symbol: "⚖️", keywords: ["Fairness", "Truth", "Law"] },
  { id: 12, name: "The Hanged Man", symbol: "🙃", keywords: ["Surrender", "Perspective", "Sacrifice"] },
  { id: 13, name: "Death", symbol: "💀", keywords: ["Endings", "Change", "Transformation"] },
  { id: 14, name: "Temperance", symbol: "🏺", keywords: ["Balance", "Moderation", "Patience"] },
  { id: 15, name: "The Devil", symbol: "😈", keywords: ["Addiction", "Materialism", "Playfulness"] },
  { id: 16, name: "The Tower", symbol: "🌩️", keywords: ["Sudden Change", "Upheaval", "Chaos"] },
  { id: 17, name: "The Star", symbol: "🌟", keywords: ["Hope", "Faith", "Purpose"] },
  { id: 18, name: "The Moon", symbol: "🌙", keywords: ["Illusion", "Fear", "Anxiety"] },
  { id: 19, name: "The Sun", symbol: "☀️", keywords: ["Positivity", "Fun", "Warmth"] },
  { id: 20, name: "Judgement", symbol: "🎺", keywords: ["Rebirth", "Inner Calling", "Absolution"] },
  { id: 21, name: "The World", symbol: "🌍", keywords: ["Completion", "Integration", "Travel"] }
];

/* 
   Helper to get a random card
   Used for initial state before AI interpretation
*/
export const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  return tarotCards[randomIndex];
};
