
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const crypto = Stripe.createSubtleCryptoProvider()

Deno.serve(async (req) => {
  try {
    const signature = req.headers.get('Stripe-Signature')
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return new Response('Stripe Webhook Secret not set in environment', { status: 500 })
    }

    if (!signature) {
      console.error("Missing Stripe-Signature header");
      return new Response('No signature header', { status: 400 })
    }

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret, undefined, crypto)
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const bookingId = session.metadata.booking_id

      console.log(`Processing checkout.session.completed for booking: ${bookingId}`);

      if (bookingId) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { error } = await supabaseClient
          .from('bookings')
          .update({
            status: 'Confirmed',
            payment_intent_id: session.payment_intent,
            session_id: session.id,
          })
          .eq('id', bookingId)

        if (error) {
          console.error('Error updating booking:', error)
          return new Response('Error updating booking', { status: 500 })
        }
        console.log(`Booking ${bookingId} confirmed successfully.`);
      } else {
          console.warn("No booking_id found in session metadata");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error("Detailed Webhook Error:", err.message);
    return new Response(err.message, { status: 400 })
  }
})
