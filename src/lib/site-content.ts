import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  youtubeId: string;
  videoHeading: string;
  coverImage: string;
  coverTwoImage: string;
  bottomOneImage: string;
  bottomTwoImage: string;
  servingTitle: string;
  servingBody: string;
};

export const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "Quality Dairy,\nNaturally Fresh",
  heroSubtitle:
    "Premium dairy and value-added products crafted for quality, freshness, and trust — delivered from farm to table.",
  whatsappNumber: "918508505854",
  youtubeId: "c1-UCuoKXMU",
  videoHeading: "Inside Athirshta Dairy.",
  coverImage: "",
  coverTwoImage: "",
  bottomOneImage: "",
  bottomTwoImage: "",
  servingTitle: "Serving Dairy Farmers\nwith Excellence",
  servingBody:
    "At Athirshtadairy, we redefine dairy excellence by combining quality, freshness, and traceability.",
};

export async function fetchSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", "home")
    .maybeSingle();
  if (error) throw error;
  return { ...DEFAULT_CONTENT, ...((data?.data as Partial<SiteContent>) ?? {}) };
}

export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content", "home"],
    queryFn: fetchSiteContent,
    staleTime: 60_000,
  });
}
