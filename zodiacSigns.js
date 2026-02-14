/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – Zodiac Data
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const zodiacSigns = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    dateRange: "Mar 21 - Apr 19",
    element: "Fire",
    planet: "Mars"
  },
  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    dateRange: "Apr 20 - May 20",
    element: "Earth",
    planet: "Venus"
  },
  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 - Jun 20",
    element: "Air",
    planet: "Mercury"
  },
  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    dateRange: "Jun 21 - Jul 22",
    element: "Water",
    planet: "Moon"
  },
  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    dateRange: "Jul 23 - Aug 22",
    element: "Fire",
    planet: "Sun"
  },
  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    dateRange: "Aug 23 - Sep 22",
    element: "Earth",
    planet: "Mercury"
  },
  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    dateRange: "Sep 23 - Oct 22",
    element: "Air",
    planet: "Venus"
  },
  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    dateRange: "Oct 23 - Nov 21",
    element: "Water",
    planet: "Pluto"
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "Nov 22 - Dec 21",
    element: "Fire",
    planet: "Jupiter"
  },
  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    dateRange: "Dec 22 - Jan 19",
    element: "Earth",
    planet: "Saturn"
  },
  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    dateRange: "Jan 20 - Feb 18",
    element: "Air",
    planet: "Uranus"
  },
  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    dateRange: "Feb 19 - Mar 20",
    element: "Water",
    planet: "Neptune"
  }
];

/* 
   Helper to determine Zodiac sign from Date of Birth
*/
export const getZodiacSign = (dateString) => {
  if (!dateString) return zodiacSigns[0]; // Default to Aries

  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns.find(z => z.id === "aries");
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns.find(z => z.id === "taurus");
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns.find(z => z.id === "gemini");
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns.find(z => z.id === "cancer");
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns.find(z => z.id === "leo");
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns.find(z => z.id === "virgo");
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns.find(z => z.id === "libra");
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns.find(z => z.id === "scorpio");
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns.find(z => z.id === "sagittarius");
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns.find(z => z.id === "capricorn");
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns.find(z => z.id === "aquarius");
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return zodiacSigns.find(z => z.id === "pisces");

  return zodiacSigns[0];
};
