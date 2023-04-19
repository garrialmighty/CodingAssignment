import {Category} from 'src/redux/reducer/types';

export const DefaultCategories: Category[] = [
  {
    name: 'Cities',
    items: [
      {
        description: 'Capital of Singapore',
        answer: 'SINGAPORE',
        points: 10,
      },
      {
        description: 'Capital of France',
        answer: 'PARIS',
        points: 6,
      },
    ],
  },
  {
    name: 'Food',
    items: [
      {
        description: 'A spicy noodle dish popular in Southeast Asia.',
        answer: 'LAKSA',
        points: 6,
      },
    ],
  },
  {
    name: 'Animals',
    items: [
      {
        description: 'Insects that have large, often, brightly coloured wings.',
        answer: 'BUTTERFLY',
        points: 10,
      },
    ],
  },
  {
    name: 'Movies',
    items: [
      {
        description:
          '2012 American superhero film based on the Marvel comics of the same name.',
        answer: 'AVENGERS',
        points: 9,
      },
    ],
  },
];
