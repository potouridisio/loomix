export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  lastPlayed: string | null;
  plays: number;
  status: "published" | "draft";
  creator?: string;
  genre?: string;
  style?: string;
  difficulty?: string;
  isNew?: boolean;
}

export const games: Game[] = [
  {
    id: "preview",
    title: "Preview Game",
    description: "Your newly generated game preview",
    thumbnail: "/games/preview.jpg",
    createdAt: new Date().toISOString().split("T")[0],
    lastPlayed: null,
    plays: 0,
    status: "draft",
    creator: "You",
    genre: "Platformer",
    style: "Pixel Art",
    difficulty: "Medium",
  },
  {
    id: "1",
    title: "My Space Shooter",
    description: "A fast-paced space shooting game with power-ups",
    thumbnail: "/games/my-space-shooter.jpg",
    createdAt: "2026-02-28",
    lastPlayed: "2026-03-02",
    plays: 45,
    status: "published",
    creator: "John Doe",
    genre: "Shooter",
    style: "Retro",
    difficulty: "Hard",
  },
  {
    id: "2",
    title: "Pixel Adventure",
    description: "Explore a pixelated world full of secrets",
    thumbnail: "/games/pixel-adventure.jpg",
    createdAt: "2026-02-20",
    lastPlayed: "2026-02-25",
    plays: 128,
    status: "published",
    creator: "John Doe",
    genre: "Platformer",
    style: "Pixel Art",
    difficulty: "Medium",
  },
  {
    id: "3",
    title: "Racing Challenge",
    description: "High-speed racing through neon cities",
    thumbnail: "/games/racing-challenge.jpg",
    createdAt: "2026-02-15",
    lastPlayed: "2026-02-18",
    plays: 32,
    status: "draft",
    creator: "John Doe",
    genre: "Racing",
    style: "Neon",
    difficulty: "Medium",
  },
  {
    id: "4",
    title: "Puzzle Master",
    description: "Mind-bending puzzles to test your skills",
    thumbnail: "/games/puzzle-master.jpg",
    createdAt: "2026-02-10",
    lastPlayed: "2026-02-12",
    plays: 67,
    status: "published",
    creator: "John Doe",
    genre: "Puzzle",
    style: "Minimalist",
    difficulty: "Hard",
  },
  {
    id: "5",
    title: "Castle Defense",
    description: "Defend your castle from waves of enemies",
    thumbnail: "/games/castle-defense.jpg",
    createdAt: "2026-02-05",
    lastPlayed: "2026-02-08",
    plays: 89,
    status: "published",
    creator: "John Doe",
    genre: "Tower Defense",
    style: "Fantasy",
    difficulty: "Easy",
  },
  {
    id: "6",
    title: "Untitled Game",
    description: "Work in progress",
    thumbnail: "/games/untitled.jpg",
    createdAt: "2026-03-01",
    lastPlayed: null,
    plays: 0,
    status: "draft",
    creator: "John Doe",
    genre: "Platformer",
    style: "Pixel Art",
    difficulty: "Easy",
  },
];

export function getGameById(id: string): Game | undefined {
  return games.find((game) => game.id === id);
}
