export interface Donation {
  id: string;
  name: string;
  url: string;
  message: string;
  amount: number;
}

export const MOCK_DONATIONS: Donation[] = [
  {
    id: "d1",
    name: "Alice",
    url: "https://buymeacoffee.com/alice",
    message: "Love the 3D world concept! Keep it up.",
    amount: 100,
  },
  {
    id: "d2",
    name: "Bob",
    url: "https://buymeacoffee.com/bob",
    message: "Happy to support.",
    amount: 50,
  },
  {
    id: "d3",
    name: "Charlie",
    url: "https://buymeacoffee.com/charlie",
    message: "This is amazing stuff.",
    amount: 25,
  },
  {
    id: "d4",
    name: "Diana",
    url: "https://buymeacoffee.com/diana",
    message: "Great work!",
    amount: 15,
  },
  {
    id: "d5",
    name: "Eve",
    url: "https://buymeacoffee.com/eve",
    message: "A small contribution for a great project.",
    amount: 10,
  },
  {
    id: "d6",
    name: "Frank",
    url: "https://buymeacoffee.com/frank",
    message: "Cool meadow generation.",
    amount: 5,
  },
  {
    id: "d7",
    name: "Grace",
    url: "https://buymeacoffee.com/grace",
    message: "Super fun extension.",
    amount: 5,
  },
  {
    id: "d8",
    name: "Hank",
    url: "https://buymeacoffee.com/hank",
    message: "Keep building!",
    amount: 5,
  },
  {
    id: "d9",
    name: "Ivy",
    url: "https://buymeacoffee.com/ivy",
    message: "Gitlantis rules.",
    amount: 15,
  },
  {
    id: "d10",
    name: "Jack",
    url: "https://buymeacoffee.com/jack",
    message: "Love it.",
    amount: 10,
  },
];
