import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

//Get All Images
export async function getMyImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}
//Get All albums and their first Photo 
export async function getAlbumFirstImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const albumImages = await db.query.albums.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      images: {
        columns: {
          url: true,
        },
        limit: 1,
        orderBy: (images, { desc }) => desc(images.id),
      }
    },
  }).then(albums => albums.map(album => ({
    id: album.id,
    name: album.name,
    firstImage: album.images[0]?.url || null
  })));
  return albumImages;
}
//Get Images for a Logged in user by the album ID
export async function getMyImagesByAlbum(albumId: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq, and }) =>
      and(
        eq(model.userId, user.userId),
        eq(model.albumId, albumId)
      ),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}


//Get an Image for a logged in user by the image ID
export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

//Delete an Image
export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized!");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    }
  })


  redirect("../");
}