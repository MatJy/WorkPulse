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

// export async function FetchSession() {
//     const supabase = await createClient();

//     const { data: workSession } = await supabase.from('workSession').select();

//     return workSession;
// }

// export async function FetchBreak(sessionId: number) {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return;
//     const { data, error } = await supabase
//         .from('Break')
//         .select()
//         .eq('session_id', sessionId);

//     return data;
// }

import { SessionsBreaks } from '../types';

export async function FetchSessionsWithBreaks(): Promise<SessionsBreaks[]> {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
    .from('workSession')
    .select(
      `
        id,
        user_id,
        created_at,
        name,
        break_interval,
        length,
        minutes_worked,
        Break (*),
        work_logs (*)
      `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FetchSessionsWithBreaks error:', error);
    return [];
  }

  return (
    sessions?.map((s) => ({
      session: {
        id: s.id,
        user_id: s.user_id,
        created_at: s.created_at,
        name: s.name,
        break_interval: s.break_interval,
        length: s.length,
        minutes_worked: s.minutes_worked,
      },
      breaks: s.Break ?? [],
      logs: s.work_logs ?? [],
    })) ?? []
  );
}

export async function EditWorkSession(
  formData: FormData,
  totalLength: number,
  session_id: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = formData.get('name');
  const break_interval = Number(formData.get('breakInterval'));
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
    .eq('id', session_id)
    .select('id')
    .single();

  if (data) {
    return data.id;
  }
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

  if (sessionError) {
    console.error('Supabase delete error:', sessionError?.message);
  }
}

export async function DeleteExtraBreaks(
  session_id: number,
  allowedBreaks: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error: sessionError } = await supabase
    .from('Break')
    .delete()
    .eq('session_id', session_id)
    .gt('"order"', allowedBreaks);

  if (sessionError) {
    console.error('Supabase delete error:', sessionError?.message);
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
    user_id: user.id,
    name: name,
    length: breakLength,
    order: order,
  });

  if (error) {
    console.error('Supabase insert error:', error.message);
  }
}
export async function EditBreak(
  formData: FormData,
  session_id: number,
  order: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = formData.get(`name${order}`);
  const breakLength = formData.get(`length${order}`);

  if (!user) return;

  const { data, error } = await supabase
    .from('Break')
    .update({
      session_id: session_id,
      user_id: user.id,
      name: name,
      length: breakLength,
      order: order,
    })
    .eq('session_id', session_id)
    .eq('"order"', order);

  if (error) {
    console.error('Supabase update error:', error.message);
  }
}

export async function CreateWorkLog(sessionId: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from('work_logs')
    .insert({
      user_id: user.id,
      session_id: sessionId,
    })
    .select('id')
    .single();

  if (data) {
    return data.id;
  }

  if (error) {
    console.error('Failed to create work log:', error);
  }
}

export async function CreateWorkLogEnded(logId: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const now = new Date();
  const utcPlus3 = new Date(now.getTime() + 3 * 60 * 60 * 1000); // +3 tuntia millisekunteina

  const { data, error } = await supabase
    .from('work_logs')
    .update({ ended_at: utcPlus3.toISOString() })
    .eq('id', logId);

  if (error) {
    console.error('Failed to update work log:', error.message);
  }
}
