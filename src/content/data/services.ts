import type { PageId, Service, ServiceDefinition, ServiceId } from "@shared/types";
import { getDictionary, localizedPath, type Locale } from "../i18n";

export const serviceDefinitions: ServiceDefinition[] = [
  { id: "reparacion-mantenimiento", slug: "reparacion-y-mantenimiento", icon: "wrench" },
  { id: "venta-maquinaria", slug: "ventas", icon: "forklift", linkTo: "products" },
  { id: "alquiler-flota", slug: "alquiler", icon: "key", linkTo: "renting" },
  { id: "asesoramiento-especializado", slug: "asesoramiento", icon: "clipboard" },
  { id: "climatizacion", slug: "climatizacion-y-aire-acondicionado", icon: "snowflake" },
];

export const serviceIds: ServiceId[] = serviceDefinitions.map(({ id }) => id);

/** True for the service detail pages, which share the service ids as page ids. */
export function isServiceId(id: PageId): id is ServiceId {
  return (serviceIds as PageId[]).includes(id);
}

export function getServices(locale: Locale): Service[] {
  const { items } = getDictionary(locale).services;
  return serviceDefinitions.map(({ id, slug, icon, linkTo }) => {
    const { link, ...copy } = items[id];
    return {
      id,
      slug,
      icon,
      ...copy,
      ...(linkTo && link ? { link: { ...link, href: localizedPath(linkTo, locale) } } : {}),
    };
  });
}
