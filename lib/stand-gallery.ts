export const standGalleryItems = [
  {
    src: "/images/stand-cheese.png",
    alt: "cheese stand",
    title: "Stand fromagerie",
  },
  {
    src: "/images/stand-charcuterie.png",
    alt: "charcuterie stand",
    title: "Stand charcuterie",
  },
  {
    src: "/images/stand-outdoor-market.png",
    alt: "outdoor market stand",
    title: "Stand marché extérieur",
  },
];

export type StandGalleryItem = (typeof standGalleryItems)[number];
