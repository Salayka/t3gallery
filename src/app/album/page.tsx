import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getAlbumFirstImages, getMyImages, getMyImagesByAlbum } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Albums() {
  const albums = await getAlbumFirstImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {albums.map((album) => (
        <div key={album.id} className="flex w-48 flex-col">
          <Link href={`/album/${album.id}`}>
            <Image
              src={album.firstImage!}
              style={{ objectFit: "contain" }}
              height={480}
              width={480}
              alt={album.name}
              loading="lazy"
              placeholder="blur"
              blurDataURL="ata:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0dHx8fHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx3/2wBDAR0dHR0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx0dHx3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </Link>
          <div>{album.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function AlbumnImagePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Pretty Please Sign in</div>
      </SignedOut>
      <SignedIn>
        <Albums />
      </SignedIn>
    </main>
  );
}
