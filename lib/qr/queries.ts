'use server';

import { createClient } from '@/lib/supabase/server';
import type { QrType } from '@/types/qr';
import { revalidatePath } from 'next/cache';

export interface QrCodeRecord {
  id: string;
  user_id: string;
  name: string;
  type: QrType;
  content: Record<string, unknown>;
  settings_json: Record<string, unknown>;
  download_count: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface SaveQrCodeInput {
  name: string;
  type: QrType;
  content: Record<string, unknown>;
  settingsJson: Record<string, unknown>;
}

export async function saveQrCode(input: SaveQrCodeInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Oturum bulunamadı, lütfen tekrar giriş yapın.' };
  }

  const { data, error } = await supabase
    .from('qr_codes')
    .insert({
      user_id: user.id,
      name: input.name,
      type: input.type,
      content: input.content,
      settings_json: input.settingsJson,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/my-qr-codes');
  revalidatePath('/dashboard');
  return { data: data as QrCodeRecord, error: null };
}

export async function updateQrCode(id: string, input: Partial<SaveQrCodeInput>) {
  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {};
  if (input.name !== undefined) updatePayload.name = input.name;
  if (input.type !== undefined) updatePayload.type = input.type;
  if (input.content !== undefined) updatePayload.content = input.content;
  if (input.settingsJson !== undefined) updatePayload.settings_json = input.settingsJson;

  const { data, error } = await supabase
    .from('qr_codes')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/my-qr-codes');
  revalidatePath('/dashboard');
  return { data: data as QrCodeRecord, error: null };
}

export async function deleteQrCode(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('qr_codes').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/my-qr-codes');
  revalidatePath('/dashboard');
  return { error: null };
}

export async function getQrCodes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('qr_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: data as QrCodeRecord[], error: null };
}

export async function getQrCodeById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('qr_codes').select('*').eq('id', id).single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as QrCodeRecord, error: null };
}

export async function toggleFavorite(id: string, isFavorite: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('qr_codes')
    .update({ is_favorite: isFavorite })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/my-qr-codes');
  revalidatePath('/dashboard');
  return { error: null };
}

export async function incrementDownloadCount(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_download_count', { qr_id: id });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/my-qr-codes');
  revalidatePath('/dashboard');
  return { error: null };
}

export interface DashboardStats {
  totalQrCodes: number;
  totalDownloads: number;
  totalFavorites: number;
}

export async function getDashboardStats(): Promise<{ data: DashboardStats; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('qr_codes').select('download_count, is_favorite');

  if (error) {
    return {
      data: { totalQrCodes: 0, totalDownloads: 0, totalFavorites: 0 },
      error: error.message,
    };
  }

  const totalQrCodes = data.length;
  const totalDownloads = data.reduce((sum, row) => sum + (row.download_count ?? 0), 0);
  const totalFavorites = data.filter((row) => row.is_favorite).length;

  return { data: { totalQrCodes, totalDownloads, totalFavorites }, error: null };
}
