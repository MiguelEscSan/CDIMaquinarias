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

/** Spanish (default locale): the reference shape every other locale must match. */
export const es = { common, home, about, services, products, rental, contact, legal, cookies, seo };

export type Dictionary = typeof es;
