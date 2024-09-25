import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
import Image from 'next/image';

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
  <div className="flex flex-wrap justify-center gap-4">    
        {
          images.map((image) => (
            <div key={image.id} className = "flex flex-col w-48">
              <Image 
                src={image.url} 
                style={{objectFit : "contain" }}
                height={480}
                width={480}
                alt={image.name} 
              />
              <div>{image.name}</div>
            </div>
          ))
        }   
      </div>
  )
}


export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please Sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
