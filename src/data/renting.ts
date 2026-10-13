import type { RentingCategory } from "../types";
import { pages } from "./pages";

export const rentingCategories: RentingCategory[] = [
  { slug: "carretillas-retractiles", name: "Carretillas retráctiles" },
  { slug: "carretillas-contrapesadas-electricas", name: "Carretillas contrapesadas eléctricas" },
  {
    slug: "carretillas-contrapesadas-diesel-gas",
    name: "Carretillas contrapesadas diésel y de gas",
  },
  { slug: "recogepedidos", name: "Recogepedidos" },
  { slug: "tractores-con-plataforma", name: "Tractores con plataforma" },
  { slug: "apiladoras-electricas", name: "Apiladoras eléctricas" },
  { slug: "transpaleta-electrica", name: "Transpaleta eléctrica" },
];

export const rentingCopy = {
  moreInfoLabel: "Más información",
  moreInfoAriaLabel: (name: string) => `Solicitar más información sobre ${name}`,
};

export function rentingInquiryHref(category: RentingCategory): string {
  return `${pages.contact.path}?equipo=${encodeURIComponent(category.slug)}`;
}

export function findRentingCategory(slug: string | null | undefined): RentingCategory | undefined {
  if (!slug) return undefined;
  return rentingCategories.find((c) => c.slug === slug);
}
