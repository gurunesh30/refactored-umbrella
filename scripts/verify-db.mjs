import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Manually load .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => {
      const [key, ...value] = line.split('=')
      return [key.trim(), value.join('=').trim().replace(/^["']|["']$/g, '')]
    })
)

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verify() {
  console.log('🔍 Verifying Supabase connection...')
  console.log('🌐 URL:', supabaseUrl)
  
  try {
    // Attempt to fetch session as a basic health check
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Auth check failed:', authError.message)
    } else {
      console.log('✅ Connection successful! Supabase Auth API is responsive.')
    }

    // Attempt to fetch from a generic table (might fail if table doesn't exist, but helps verify DB)
    const { error: dbError } = await supabase.from('profiles').select('*').limit(1)
    
    if (dbError) {
      if (dbError.code === 'PGRST116' || dbError.code === '42P01') {
        console.log('ℹ️  Note: "profiles" table not found or empty, but DB connection is valid.')
      } else {
        console.error('❌ DB query failed:', dbError.message)
      }
    } else {
      console.log('✅ DB connection successful! "profiles" table is accessible.')
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

verify()
