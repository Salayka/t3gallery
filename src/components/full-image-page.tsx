// import { Modal } from './modal';
import { deleteImage, getImage } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import posthog from "posthog-js";
import { Button } from "./ui/button";
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  posthog.capture('ImageViewed', { status: 'viewed' })
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center ">
        <img src={image.url} className="flex-shrink object-contain" />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b text-center text-lg p-2">{image.name}</div>

        <div className="p-2">
          <span>Uploaded By</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form action={async () => {
            "use server";
            await deleteImage(props.id);
          }}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
  // return <div>{photoId}</div>;
}