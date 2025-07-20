'use server';
import { createClient } from '@/utils/supabase/server';

export async function CreateWorkSession(formData: FormData, props: number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get('name');
    const break_interval = Number(formData.get('breakInterval'));
    const totalLength = props;

    if (!user) return;

    const { data, error } = await supabase
        .from('workSession')
        .insert({
            user_id: user.id,
            name: name,
            break_interval: break_interval,
            length: totalLength,
        })
        .select('id')
        .single();

    if (data) {
        return data.id;
    }

    if (error) {
        console.error('Supabase insert error:', error.message);
    }
}

export async function FetchSession() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    const { data, error } = await supabase.from('workSession').select();

    return data;
}

export async function FetchBreak() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    const { data, error } = await supabase.from('Break').select();

    return data;
}

export async function UpdateWorkSession(
    formData: FormData,
    totalLength: number,
    session_id: number
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get('name');
    const break_interval = Number(formData.get('break'));
    const length = totalLength;

    if (!user) return;

    const { data, error } = await supabase
        .from('workSession')
        .update({
            user_id: user.id,
            name: name,
            break_interval: break_interval,
            length: length,
        })
        .eq('id', session_id);
}

export async function DeleteSession(session_id: number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error: sessionError } = await supabase
        .from('workSession')
        .delete()
        .eq('id', session_id);

    const { error: breakError } = await supabase
        .from('Break')
        .delete()
        .eq('session_id', session_id);

    if (sessionError || breakError) {
        console.error(
            'Supabase delete error:',
            sessionError?.message,
            breakError?.message
        );
    }
}

export async function CreateBreak(
    formData: FormData,
    sessionId: number,
    order: number
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get(`name${order}`);
    const breakLength = formData.get(`length${order}`);

    if (!user) return;

    const { error } = await supabase.from('Break').insert({
        session_id: sessionId,
        name: name,
        length: breakLength,
        order: order,
    });

    if (error) {
        console.error('Supabase insert error:', error.message);
    }
}
