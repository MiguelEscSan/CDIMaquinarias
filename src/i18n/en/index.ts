import type { Dictionary } from "../es";
import { about } from "./about";
import { common } from "./common";
import { contact } from "./contact";
import { cookies } from "./cookies";
import { home } from "./home";
import { legal } from "./legal";
import { products } from "./products";
import { rental } from "./rental";
import { seo } from "./seo";
import { services } from "./services";

/** English (en-GB). Typed against the Spanish dictionary so missing or extra keys fail `astro check`. */
export const en: Dictionary = { common, home, about, services, products, rental, contact, legal, cookies, seo };
