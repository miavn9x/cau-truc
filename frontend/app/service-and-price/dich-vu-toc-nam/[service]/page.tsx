import { DataService } from "../../../../lib/data-service";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";
import type { Metadata } from "next";

// Generate static parameters for all services
export async function generateStaticParams() {
  const category = DataService.getCategory("men-hair");
  if (!category) return [];

  return Object.keys(category.services).map((serviceId) => ({
    service: serviceId,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const serviceData = DataService.getService("men-hair", service);

  if (!serviceData) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${serviceData.title} - Winchair Beauty Spa`,
    description: serviceData.description,
    keywords: `${serviceData.title}, dịch vụ tóc nam, Winchair Beauty Spa`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  // Verify service exists
  const serviceData = DataService.getService("men-hair", service);

  if (!serviceData) {
    notFound();
  }

  return <ServicePageClient params={{ service }} />;
}
