import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        'https://wmgdbjgwrdqifwsbikec.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZ2Riamd3cmRxaWZ3c2Jpa2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzQwODUsImV4cCI6MjA2NzgxMDA4NX0.zopu-nLGiNj6ntKIFiBCrNXZc2ytkDNmmVn6jTnP7uA'
    );
}
