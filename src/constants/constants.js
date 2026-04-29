import tonedMilkImg from '@/assets/toned-milk.jpg';
import wheatFlourImg from '@/assets/wheat-flour.jpg';

export const shoppingItems = [
  {
    id: 1,
    name: 'Toned Milk 1L',
    price: 40,
    image: tonedMilkImg,
  },
  {
    id: 2,
    name: 'Wheat Flour 5kg',
    price: 200,
    image: wheatFlourImg,
  },
];

export const GEOPHRASE_API_KEY = process.env.NEXT_PUBLIC_GEOPHRASE_API_KEY;
