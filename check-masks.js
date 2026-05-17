const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, stock')
    .ilike('name', '%Mascarilla%');
    
  console.log('Mascarillas encontradas en DB:', data);
  if (error) console.error('Error:', error);
}

run();
