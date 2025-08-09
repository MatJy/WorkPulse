import { createClient } from '@/utils/supabase/server';
import { SessionsBreaks } from '@/app/types';
import { Break } from '@/app/types';

export async function FetchSessionBreaksById(sessionId: number) {
    const supabase = await createClient();

    const { data: session } = await supabase
        .from('workSession')
        .select()
        .eq('id', sessionId)
        .single();
    if (!session) return [];

    const { data: breaks } = await supabase
        .from('Break')
        .select()
        .eq('session_id', sessionId);

    const { data: logs } = await supabase
        .from('work_logs')
        .select()
        .eq('session_id', session.id)
        .order('started_at', { ascending: false });

    const result: SessionsBreaks = {
        session,
        breaks: breaks || [],
        logs: logs || [],
    };

    return result;
}
