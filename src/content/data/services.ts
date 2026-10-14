import type { PageId, Service, ServiceDefinition, ServiceDetailId } from "@shared/types";
import { getDictionary, localizedPath, type Locale } from "../i18n";

export const serviceDefinitions: ServiceDefinition[] = [
  { id: "reparacion-mantenimiento", slug: "reparacion-y-mantenimiento", icon: "wrench", detailPage: "reparacion-mantenimiento" },
  { id: "venta-maquinaria", slug: "ventas", icon: "forklift", detailPage: "products" },
  { id: "alquiler-flota", slug: "alquiler", icon: "key", detailPage: "renting" },
  { id: "asesoramiento-especializado", slug: "asesoramiento", icon: "clipboard", detailPage: "asesoramiento-especializado" },
  { id: "climatizacion", slug: "climatizacion-y-aire-acondicionado", icon: "snowflake", detailPage: "climatizacion" },
];

/** Services that have their own detail page (and therefore their own route). */
export const serviceDetailIds = serviceDefinitions
  .filter(({ id, detailPage }) => id === detailPage)
  .map(({ id }) => id as ServiceDetailId);

export function isServiceId(id: PageId): id is ServiceDetailId {
  return (serviceDetailIds as PageId[]).includes(id);
}

export function getServices(locale: Locale): Service[] {
  const { items } = getDictionary(locale).services;
  return serviceDefinitions.map(({ id, slug, icon, detailPage }) => ({
    id,
    slug,
    icon,
    href: localizedPath(detailPage, locale),
    ...items[id],
  }));
}
