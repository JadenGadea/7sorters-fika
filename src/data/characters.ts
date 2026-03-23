export interface Character {
  id: number;
  name: string;
  cafe: string;
  emoji: string;
  description: string;
  color: string;
}

export const SWISH_NUMBER = "1234567890"; // Replace with your real Swish number
export const DEFAULT_AMOUNT = 20;

export const characters: Character[] = [
  {
    id: 1,
    name: "Bullen",
    cafe: "Café Valand",
    emoji: "🐂",
    description:
      "Bullen är stark som en oxe men mjuk som en kanelbulle. Hen älskar att sitta vid fönstret och titta på folk som går förbi.",
    color: "#E07A5F",
  },
  {
    id: 2,
    name: "Smansen",
    cafe: "Café Husaren",
    emoji: "🐭",
    description:
      "Smansen är liten men modig. Hen samlar på smulor och drömmer om att en dag baka världens största fika.",
    color: "#81B29A",
  },
  {
    id: 3,
    name: "Kråkan",
    cafe: "Da Matteo",
    emoji: "🐦‍⬛",
    description:
      "Kråkan är nyfiken på allt och alla. Hen lyssnar på samtal och skriver dikter om vad hen hör.",
    color: "#3D405B",
  },
  {
    id: 4,
    name: "Mållansen",
    cafe: "Café Kringlan",
    emoji: "🎨",
    description:
      "Mållansen målar tavlor med kaffe istället för färg. Varje kopp inspirerar ett nytt konstverk.",
    color: "#F2CC8F",
  },
  {
    id: 5,
    name: "Tutten",
    cafe: "Konditori Björken",
    emoji: "🦉",
    description:
      "Tutten är en klok uggla som läser tidningen varje morgon och alltid har en god historia att berätta.",
    color: "#6D597A",
  },
  {
    id: 6,
    name: "Ransen",
    cafe: "Lisas Café",
    emoji: "🎒",
    description:
      "Ransen bär alltid med sig något oväntat. En dag en bok, nästa dag en blomma, alltid en överraskning.",
    color: "#B56576",
  },
  {
    id: 7,
    name: "Sockerbansen",
    cafe: "Café Stansen",
    emoji: "🧁",
    description:
      "Sockerbansen är den sötaste av alla. Hen sprider glädje vart hen än går och delar alltid med sig.",
    color: "#E5989B",
  },
];

export function getCharacter(id: number): Character | undefined {
  return characters.find((c) => c.id === id);
}
