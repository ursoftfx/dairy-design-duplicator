import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_CONTENT, fetchSiteContent, type SiteContent } from "@/lib/site-content";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Athirshta Dairy" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        navigate({ to: "/login" });
        return;
      }

      const [{ data: admin, error: roleError }, c] = await Promise.all([
        supabase.rpc("has_role", {
          _user_id: userData.user.id,
          _role: "admin",
        }),
        fetchSiteContent(),
      ]);

      if (!active) return;

      if (roleError) {
        setMsg("Could not verify admin access. Please try signing in again.");
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(admin));
      }

      setContent(c);
      setReady(true);
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  function update<K extends keyof SiteContent>(k: K, v: SiteContent[K]) {
    setContent((c) => ({ ...c, [k]: v }));
  }

  async function uploadImage(file: File, key: keyof SiteContent) {
    const path = `${key}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      setMsg(`Upload failed: ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    update(key, data.publicUrl as SiteContent[typeof key]);
    setMsg("Image uploaded.");
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("site_content")
      .update({
        data: content as never,
        updated_at: new Date().toISOString(),
        updated_by: userData.user?.id,
      })
      .eq("id", "home");
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setMsg("Saved!");
    qc.invalidateQueries({ queryKey: ["site_content", "home"] });
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (!ready) return <div className="p-10 text-center text-sm">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-2xl font-bold">Not authorized</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account does not have admin access. Ask the site owner to grant you the admin role.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={logout}>Sign out</Button>
          <Link to="/" className="inline-flex items-center rounded-md border px-4 py-2 text-sm">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Site content</h1>
        <div className="flex gap-2">
          <Link to="/" className="inline-flex items-center rounded-md border px-3 py-2 text-sm">
            View site
          </Link>
          <Button variant="outline" onClick={logout}>Sign out</Button>
        </div>
      </div>

      <Section title="Hero">
        <Field label="Title (use line breaks)">
          <Textarea rows={3} value={content.heroTitle} onChange={(e) => update("heroTitle", e.target.value)} />
        </Field>
        <Field label="Subtitle">
          <Textarea rows={3} value={content.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} />
        </Field>
        <ImageField label="Hero / Cover 1 image" value={content.coverImage} onUpload={(f) => uploadImage(f, "coverImage")} onClear={() => update("coverImage", "")} />
      </Section>

      <Section title="Cover 2 banner">
        <ImageField label="Cover 2 image" value={content.coverTwoImage} onUpload={(f) => uploadImage(f, "coverTwoImage")} onClear={() => update("coverTwoImage", "")} />
      </Section>

      <Section title="Serving section">
        <Field label="Title">
          <Textarea rows={2} value={content.servingTitle} onChange={(e) => update("servingTitle", e.target.value)} />
        </Field>
        <Field label="Body">
          <Textarea rows={4} value={content.servingBody} onChange={(e) => update("servingBody", e.target.value)} />
        </Field>
      </Section>

      <Section title="YouTube video">
        <Field label="YouTube video ID (e.g. c1-UCuoKXMU)">
          <Input value={content.youtubeId} onChange={(e) => update("youtubeId", e.target.value)} />
        </Field>
        <Field label="Video section heading">
          <Input value={content.videoHeading} onChange={(e) => update("videoHeading", e.target.value)} />
        </Field>
      </Section>

      <Section title="Bottom gallery">
        <ImageField label="Bottom photo 1" value={content.bottomOneImage} onUpload={(f) => uploadImage(f, "bottomOneImage")} onClear={() => update("bottomOneImage", "")} />
        <ImageField label="Bottom photo 2" value={content.bottomTwoImage} onUpload={(f) => uploadImage(f, "bottomTwoImage")} onClear={() => update("bottomTwoImage", "")} />
      </Section>

      <Section title="WhatsApp">
        <Field label="WhatsApp number (with country code, digits only)">
          <Input value={content.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} />
        </Field>
      </Section>

      <div className="sticky bottom-4 flex items-center justify-between rounded-xl border bg-card p-4 shadow-lg">
        <p className="text-sm text-muted-foreground">{msg ?? "Changes are saved when you click Save."}</p>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
function ImageField({
  label,
  value,
  onUpload,
  onClear,
}: {
  label: string;
  value: string;
  onUpload: (f: File) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {value ? (
        <div className="flex items-center gap-3">
          <img src={value} alt="" className="h-20 w-32 rounded-md object-cover" />
          <Button type="button" variant="outline" size="sm" onClick={onClear}>Remove</Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Using default image. Upload to override.</p>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
