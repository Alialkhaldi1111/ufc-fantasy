import { NextResponse } from 'next/server';

const PRODUCTS = [
  {
    id: 'apex-cold-plunge-v1',
    slug: 'apex-cold-plunge-pro',
    name: 'APEX Cold Plunge Pro',
    description: 'Professional portable ice bath for elite athletes. Sets up in 60 seconds.',
    price: 24900,
    comparePrice: 39900,
    cost: 8500,
    stock: 47,
    images: [],
    featured: true,
    active: true,
  },
];

export async function GET() {
  return NextResponse.json({ products: PRODUCTS.filter((p) => p.active) });
}
