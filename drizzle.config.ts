import type {Config} from 'drizzle-kit'
import * as dotenv from 'dotenv';
dotenv.config({path:".env"});

if(!process.env.DATABASE_URL){
    console.log("cannot find database url");
}

export default {
    schema:"./src/lib/supabase/schema.ts",
    out:"./migrations",
    dialect:"postgresql",
    // driver:"d1-http",
    dbCredentials:{
        // connectionString:process.env.DATABASE_URL || ""
        url:process.env.DATABASE_URL || ""
    }
} satisfies Config;
