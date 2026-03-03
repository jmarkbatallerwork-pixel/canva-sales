import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = "https://goekqwyjkkjsqvqftonf.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvZWtxd3lqa2tqc3F2cWZ0b25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTk3MTEsImV4cCI6MjA4ODA3NTcxMX0.9tdpPgM5e4yuSKB8DnBYsdd7RDJvXZ1ojFQkvvF1du8"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
