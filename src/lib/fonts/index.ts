import {
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Karla,
  Rubik,
} from "next/font/google";
import localFont from "next/font/local";

const ibm_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const berkeley_mono = localFont({
  src: "./local/berkeley_mono.woff2",
  variable: "--font-mono",
});

const proxima = localFont({
  src: "./local/proxima_vara.woff2",
  variable: "--font-sans",
});

export const fonts = {
  inter,
  rubik,
  karla,
  ibm_sans,
  jetbrains,
  berkeley_mono,
  proxima,
};
