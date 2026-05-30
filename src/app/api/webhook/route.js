import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Здесь можно сохранять статус подписки в Supabase
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment successful:', session);
    // В будущем: обновить профиль пользователя в БД
  }

  return NextResponse.json({ received: true });
}