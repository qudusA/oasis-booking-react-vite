import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hfzygplbfkpiklzemmsx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmenlncGxiZmtwaWtsemVtbXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NjE5MDcsImV4cCI6MjAzODAzNzkwN30.sF7SdwgUv9H06vWdhdJWEWIbGiLKoHmpsWMk3n1zssE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
