CREATE TABLE IF NOT EXISTS "users_for_dashboard" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone,
	"name" text NOT NULL
);
