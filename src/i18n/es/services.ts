import type { ServiceCopy, ServiceId } from "../../types";

export const services: { items: Record<ServiceId, ServiceCopy> } = {
  items: {
    "reparacion-mantenimiento": {
      title: "Reparación y mantenimiento",
      description:
        "Equipo técnico altamente especializado en resolución de averías multimarca, mantenimiento preventivo y correctivo en taller o in situ.",
      detail:
        "Nuestro servicio de reparación y mantenimiento de máquinas es fundamental para garantizar la durabilidad y el rendimiento de los equipos. Con técnicos altamente capacitados y utilizando las últimas tecnologías, nos comprometemos a mantener la maquinaria de nuestros clientes en condiciones óptimas de funcionamiento, desde inspecciones preventivas hasta reparaciones especializadas. Nuestro equipo está dedicado a mantener la productividad y la seguridad en cada operación.",
      features: [
        "Resolución de averías multimarca",
        "Mantenimiento preventivo y correctivo",
        "Servicio en taller o in situ",
      ],
    },
    "venta-maquinaria": {
      title: "Ventas",
      description:
        "Especialistas en asesoramiento comercial para suministrar la maquinaria adecuada a las necesidades del cliente (gama STILL y maquinaria industrial).",
      detail:
        "La división de ventas de nuestra empresa se especializa en ofrecer una amplia gama de máquinas de alta calidad de marcas reconocidas como STILL. Nuestro compromiso radica en proporcionar soluciones eficientes y personalizadas para las necesidades de nuestros clientes. Desde equipos de manipulación de materiales hasta maquinaria de construcción, trabajamos para garantizar la satisfacción y el éxito de quienes confían en nosotros para sus proyectos y operaciones.",
      features: [
        "Asesoramiento comercial especializado",
        "Gama STILL y maquinaria industrial",
        "Maquinaria adecuada a cada necesidad",
      ],
      link: { label: "Saber más", ariaLabel: "Saber más sobre los productos STILL" },
    },
    "alquiler-flota": {
      title: "Alquiler",
      description:
        "Flota versátil y flexible para proyectos a corto, medio o largo plazo y puntas de trabajo.",
      detail:
        "Nuestra opción de alquiler y renting ofrece una solución flexible y rentable para quienes buscan acceso a equipos de primera clase sin comprometerse con una compra a largo plazo. Con una variedad de modelos de STILL disponibles, adaptamos nuestros planes a las necesidades específicas de cada cliente. Ya sea a corto o largo plazo, nuestro servicio de alquiler garantiza una operación sin complicaciones.",
      features: [
        "Proyectos a corto, medio o largo plazo",
        "Cobertura de puntas de trabajo",
        "Flota versátil y flexible",
      ],
      link: { label: "Saber más", ariaLabel: "Saber más sobre el alquiler y renting de equipos" },
    },
    "asesoramiento-especializado": {
      title: "Asesoramiento",
      description:
        "Consultoría técnica continua para dimensionar almacenes y optimizar la intralogística.",
      detail:
        "Nuestro servicio de asesoramiento está diseñado para brindar orientación experta a nuestros clientes en la selección, adquisición y optimización de sus equipos. Nuestros asesores, altamente capacitados, trabajan estrechamente con cada cliente para comprender sus necesidades específicas y ofrecer soluciones personalizadas que impulsen la eficiencia y la rentabilidad. Desde la evaluación inicial hasta la implementación, nos comprometemos a orientar y aconsejar a nuestros clientes para que logren el éxito en sus proyectos y operaciones.",
      features: [
        "Consultoría técnica continua",
        "Dimensionamiento de almacenes",
        "Optimización de la intralogística",
      ],
    },
    climatizacion: {
      title: "Climatización y aire acondicionado",
      description:
        "Montaje, reparación y mantenimiento de equipos de climatización para oficinas, naves y locales comerciales.",
      detail:
        "Montaje, reparación y mantenimiento de equipos de climatización para oficinas, naves y locales comerciales. Sabemos lo importante que es un entorno de trabajo cómodo para maximizar la productividad, por lo que nos aseguramos de que sus sistemas de climatización funcionen de manera óptima en todo momento.",
      features: ["Montaje, reparación y mantenimiento", "Oficinas, naves y locales comerciales"],
    },
  },
};
