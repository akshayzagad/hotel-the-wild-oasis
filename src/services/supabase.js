import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://mogncmpwzzznvddputnn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ25jbXB3enp6bnZkZHB1dG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MjM4NTksImV4cCI6MjA2NTk5OTg1OX0.LXSa4g6TWklfawISgimBg25_RIKo1TWu73mjXwxbkQU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;