'use server';
import { createClient } from '@/utils/supabase/server';

export async function CreateWorkSession(formData: FormData, props: number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get('name');
    const break_interval = Number(formData.get('break'));
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

export async function CreateBreak(
    formData: FormData,
    sessionId: number,
    order: number
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get('name');
    const breakLength = formData.get('length');

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
