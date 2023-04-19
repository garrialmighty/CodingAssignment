export type Question = {
  description: string;
  answer: string;
  points: number;
};

export type Category = {
  name: string;
  items: Question[];
};
