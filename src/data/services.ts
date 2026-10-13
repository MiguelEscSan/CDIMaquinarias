import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "reparacion-mantenimiento",
    slug: "reparacion-y-mantenimiento",
    title: "Reparación y Mantenimiento",
    description:
      "Equipo técnico altamente especializado en resolución de averías multimarca, mantenimiento preventivo y correctivo en taller o in situ.",
    icon: "wrench",
    features: [
      "Resolución de averías multimarca",
      "Mantenimiento preventivo y correctivo",
      "Servicio en taller o in situ",
    ],
  },
  {
    id: "venta-maquinaria",
    slug: "venta-de-maquinaria",
    title: "Venta de Maquinaria",
    description:
      "Especialistas en asesoramiento comercial para suministrar la maquinaria adecuada a las necesidades del cliente (gama STILL y maquinaria industrial).",
    icon: "forklift",
    features: [
      "Asesoramiento comercial especializado",
      "Gama STILL y maquinaria industrial",
      "Maquinaria adecuada a cada necesidad",
    ],
  },
  {
    id: "alquiler-flota",
    slug: "alquiler-de-flota",
    title: "Alquiler de Flota",
    description:
      "Flota versátil y flexible para proyectos a corto, medio o largo plazo y puntas de trabajo.",
    icon: "key",
    features: [
      "Proyectos a corto, medio o largo plazo",
      "Cobertura de puntas de trabajo",
      "Flota versátil y flexible",
    ],
  },
  {
    id: "asesoramiento-especializado",
    slug: "asesoramiento-especializado",
    title: "Asesoramiento Especializado",
    description:
      "Consultoría técnica continua para dimensionar almacenes y optimizar la intralogística.",
    icon: "clipboard",
    features: [
      "Consultoría técnica continua",
      "Dimensionamiento de almacenes",
      "Optimización de la intralogística",
    ],
  },
  {
    id: "climatizacion",
    slug: "climatizacion-y-aire-acondicionado",
    title: "Climatización y Aire Acondicionado",
    description:
      "Montaje, reparación y mantenimiento de equipos de climatización para oficinas, naves y locales comerciales.",
    icon: "snowflake",
    features: [
      "Montaje, reparación y mantenimiento",
      "Oficinas, naves y locales comerciales",
    ],
  },
];
