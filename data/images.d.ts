declare module "@/data/images.json" {
  interface ImageDataItem {
    image_url: string;
    tags: string[];
    status: string;
  }
  const images: ImageDataItem[];
  export default images;
}

