import type { Dictionary } from "../es";

export const rental: Dictionary["rental"] = {
  categories: {
    "carretillas-retractiles": "Schubmaststapler",
    "carretillas-contrapesadas-electricas": "Elektrische Gegengewichtsstapler",
    "carretillas-contrapesadas-diesel-gas": "Diesel- und Gas-Gegengewichtsstapler",
    recogepedidos: "Kommissionierer",
    "tractores-con-plataforma": "Schlepper mit Plattform",
    "apiladoras-electricas": "Elektrische Stapler",
    "transpaleta-electrica": "Elektrische Transpaletten",
  },
  moreInfoLabel: "Weitere Informationen",
  moreInfoAriaLabel: (name) => `Weitere Informationen zu ${name} anfordern`,
};
