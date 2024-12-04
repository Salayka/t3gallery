ALTER TABLE "t3gallery_image" RENAME COLUMN "albumId" TO "album_id";--> statement-breakpoint
ALTER TABLE "t3gallery_image" ALTER COLUMN "album_id" SET DATA TYPE integer USING album_id::integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3gallery_image" ADD CONSTRAINT "t3gallery_image_album_id_t3gallery_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."t3gallery_album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "album_idx" ON "t3gallery_image" USING btree ("album_id");