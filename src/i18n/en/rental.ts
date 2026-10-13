import type { Dictionary } from "../es";

export const rental: Dictionary["rental"] = {
  categories: {
    "carretillas-retractiles": "Reach trucks",
    "carretillas-contrapesadas-electricas": "Electric counterbalance trucks",
    "carretillas-contrapesadas-diesel-gas": "Diesel and LPG counterbalance trucks",
    recogepedidos: "Order pickers",
    "tractores-con-plataforma": "Tow tractors with platform",
    "apiladoras-electricas": "Electric stackers",
    "transpaleta-electrica": "Electric pallet truck",
  },
  moreInfoLabel: "More information",
  moreInfoAriaLabel: (name) => `Request more information about ${name}`,
};
