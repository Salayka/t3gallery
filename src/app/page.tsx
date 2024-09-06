import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

// const mockUrls = [
//   "https://utfs.io/f/47293248-6b1c-41bc-8a2e-61d16b6d5035-3w88eu.jpg",
//   "https://utfs.io/f/18a24134-572e-4e8c-9d36-db3c21ff4595-3wphyw.jpg",
//   "https://utfs.io/f/bd0b9b28-4d85-41f9-b1b3-1dd4f2df2c25-3wq20b.jpg",
//   "https://utfs.io/f/2282d788-fcc4-49f6-9a48-f86f596692a1-3v2qen.jpg",
//   "https://utfs.io/f/06f0559c-566d-4f36-a57b-d87b0e400403-3w7lfe.jpg",
// ];

// const mockImages = mockUrls.map((url, index)=>({
//   id: index + 1,
//   url,
// }));


export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        
        {
          [...images,...images,...images].map((image, index) => (
            <div key={image.id+"-"+index} className = "flex flex-col w-48">
              <img src={image.url} alt="image" />
              <div>{image.name}</div>
            </div>
          ))
        }
        
      </div>
    </main>
  );
}
