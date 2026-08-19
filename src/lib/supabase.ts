import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lznxtbnqwaryqkyxfwgy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bnh0Ym5xd2FyeXFreXhmd2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTk1MjIsImV4cCI6MjA5NjkzNTUyMn0.PGQqRFmGjE5GncIs5Eeqf5fvgxQtDMgvggNLzNEGOJk';

console.log('Supabase Initialized successfully.');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
