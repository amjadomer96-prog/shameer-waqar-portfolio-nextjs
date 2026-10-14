import { HOME_DESCRIPTION, NAME } from "@/lib/seo";

export default function manifest() {
  return {
    name: `${NAME}, full stack and mobile developer`,
    short_name: NAME,
    description: HOME_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#0A0B0D",
    theme_color: "#0A0B0D",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
