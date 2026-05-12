import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all contact clicks
    const { data: clicks, error } = await supabase
      .from('contact_clicks')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch stats' },
        { status: 500 }
      );
    }

    const clicksArray = clicks || [];
    const totalClicks = clicksArray.length;
    const callClicks = clicksArray.filter(c => c.contact_type === 'call').length;
    const whatsappClicks = clicksArray.filter(c => c.contact_type === 'whatsapp').length;

    return NextResponse.json({
      totalClicks,
      callClicks,
      whatsappClicks,
      recentClicks: clicksArray.slice(0, 20),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
