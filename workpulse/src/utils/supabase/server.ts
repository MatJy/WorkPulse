import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        'https://wmgdbjgwrdqifwsbikec.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZ2Riamd3cmRxaWZ3c2Jpa2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzQwODUsImV4cCI6MjA2NzgxMDA4NX0.zopu-nLGiNj6ntKIFiBCrNXZc2ytkDNmmVn6jTnP7uA',
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}
