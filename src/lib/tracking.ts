/**
 * Track Call and WhatsApp button clicks
 * Logs to Supabase with timestamp and contact type
 */
export async function trackContactClick(contactType: 'call' | 'whatsapp', propertyId: string) {
  try {
    // Send to API endpoint
    const response = await fetch('/api/track-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactType,
        propertyId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn('Failed to track contact click');
    }
  } catch (error) {
    console.error('Error tracking contact click:', error);
  }
}
