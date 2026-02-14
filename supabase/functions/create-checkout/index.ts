
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("Request received:", req.method, req.url);

    // 1. Validate Secret Key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
        console.error("FATAL: STRIPE_SECRET_KEY is not set in Edge Function secrets.");
        throw new Error("Server misconfiguration: Stripe Key missing");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // 2. Parse Body
    let body;
    try {
        body = await req.json();
    } catch (e) {
        console.error("Error parsing JSON body:", e);
        throw new Error("Invalid JSON body");
    }

    const { booking_id } = body;
    console.log(`Processing booking_id: ${booking_id}`);

    if (!booking_id) {
        throw new Error("booking_id is required");
    }

    // 3. Create Supabase Client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 4. Get User
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
        console.error("User auth failed:", userError);
        throw new Error("User authentication failed");
    }
    console.log("User authenticated:", user.email);

    // 5. Fetch Booking
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .single()

    if (bookingError || !booking) {
      console.error("Booking fetch failed:", bookingError);
      throw new Error("Booking not found or access denied");
    }
    console.log("Booking found:", booking.package_title);

    // 6. Create Stripe Session
    console.log("Creating Stripe Session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: booking.package_title || 'Travel Package',
              description: `Booking for ${booking.package_destination}`,
            },
            unit_amount: Math.round((booking.pricing?.totalCost || 0) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      customer_email: user.email,
      metadata: {
        booking_id: booking_id,
      },
    })

    console.log("Stripe Session Created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error("Handler Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
