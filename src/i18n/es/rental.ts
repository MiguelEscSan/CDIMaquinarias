import type { RentingSlug } from "../../data/renting";

export const rental: {
  categories: Record<RentingSlug, string>;
  moreInfoLabel: string;
  moreInfoAriaLabel: (name: string) => string;
} = {
  categories: {
    "carretillas-retractiles": "Carretillas retráctiles",
    "carretillas-contrapesadas-electricas": "Carretillas contrapesadas eléctricas",
    "carretillas-contrapesadas-diesel-gas": "Carretillas contrapesadas diésel y de gas",
    recogepedidos: "Recogepedidos",
    "tractores-con-plataforma": "Tractores con plataforma",
    "apiladoras-electricas": "Apiladoras eléctricas",
    "transpaleta-electrica": "Transpaleta eléctrica",
  },
  moreInfoLabel: "Más información",
  moreInfoAriaLabel: (name) => `Solicitar más información sobre ${name}`,
};
