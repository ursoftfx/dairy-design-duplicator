import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/cover-1.jpg";
import coverTwo from "@/assets/cover-2.jpg";
import productsImg from "@/assets/dairy-products.jpg";
import bottomOne from "@/assets/bottom-1.jpg";
import bottomTwo from "@/assets/bottom-2.jpg";
import logo from "@/assets/athirshta-logo.png";
import { Milk, Leaf, ShieldCheck, Truck, Sprout, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Athirshtadairy — Quality Dairy, Naturally Fresh" },
      {
        name: "description",
        content:
          "Premium dairy and value-added products crafted for quality, freshness, and trust — delivered from farm to table.",
      },
      { property: "og:title", content: "Athirshtadairy — Quality Dairy, Naturally Fresh" },
      {
        property: "og:description",
        content: "Premium dairy crafted for quality, freshness, and trust.",
      },
    ],
  }),
  component: Index,
});

const navItems = ["Farmlink", "DistriCo", "Athirshtadairy", "BioScience", "Tech Solutions", "About Us"];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Glass of fresh milk being poured in a green pasture with a cow in the background"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white">
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold tracking-tight">
              ATHIRSHTA<span className="text-brand-teal">D</span>AIRY
            </span>
            <span className="text-[10px] font-medium opacity-75">
              Disrupting the food value chain with technology.
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {navItems.map((n) => (
              <a key={n} href="#" className="opacity-90 transition hover:opacity-100">
                {n}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-white/40 px-4 py-2 transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </nav>
        </header>

        <div className="mx-auto max-w-7xl px-6 pt-8 pb-32 text-white sm:pt-16 sm:pb-44">
          <p className="mb-6 text-sm opacity-80">
            <Link to="/" className="hover:underline">Home</Link> / Dairy
          </p>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Quality Dairy,
            <br /> Naturally Fresh
          </h1>
          <p className="mt-6 max-w-xl text-base opacity-90 sm:text-lg">
            Premium dairy and value-added products crafted for quality, freshness, and trust —
            delivered from farm to table.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#buyer"
              className="rounded-full bg-brand-teal px-7 py-3.5 text-sm font-semibold text-brand-teal-foreground shadow-lg shadow-brand-teal/30 transition hover:brightness-110"
            >
              Connect as a Buyer
            </a>
            <a
              href="#seller"
              className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore as a Seller
            </a>
          </div>
        </div>
      </section>

      {/* COVER 2 BANNER */}
      <section className="relative w-full">
        <img
          src={coverTwo}
          alt="Athirshta Dairy premium milk, ghee and paneer"
          className="h-[40vh] w-full object-cover sm:h-[60vh]"
        />
      </section>

      {/* SERVING SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Serving Dairy Farmers
              <br /> with Excellence
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              At Athirshtadairy, we redefine dairy excellence by combining quality, freshness, and
              traceability. Our dairy and value-added products are crafted with care, ensuring every
              drop and every bite meets the highest standards of safety and nutrition.
            </p>
            <p>
              Sourced directly from our network of trusted farmers and processed in state-of-the-art
              facilities, Athirshtadairy products bring the best of dairy to consumers and businesses
              alike. Whether it's the purity of fresh milk or the goodness of our value-added
              offerings like curd, paneer, and ghee — every product reflects our promise.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-teal">
              What sets us apart
            </p>
            <h2 className="text-4xl font-extrabold sm:text-5xl">From farm to table, with trust.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sprout, title: "Sourced with care", desc: "Milk from a trusted network of farmers practicing responsible dairying." },
              { icon: ShieldCheck, title: "Safety first", desc: "Every batch tested across multiple quality checkpoints before shipping." },
              { icon: Truck, title: "Cold chain delivery", desc: "Temperature-controlled logistics keep freshness intact, end to end." },
              { icon: BadgeCheck, title: "Full traceability", desc: "Track every product back to its source farm with our digital ledger." },
              { icon: Leaf, title: "Naturally fresh", desc: "No preservatives, no compromises — just clean, wholesome dairy." },
              { icon: Milk, title: "Value-added range", desc: "Curd, paneer, ghee, and more — crafted to traditional standards." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/10"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal transition group-hover:bg-brand-teal group-hover:text-brand-teal-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-navy/10">
            <img
              src={productsImg}
              alt="Selection of dairy products on a wooden board"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-teal">
              Our products
            </p>
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              A complete range of fresh, wholesome dairy.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Fresh Cow & Buffalo Milk",
                "Curd, Yogurt & Lassi",
                "Paneer & Artisan Cheese",
                "Pure Cow Ghee & Butter",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                    ✓
                  </span>
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-10 inline-flex rounded-full bg-brand-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Request Product Catalog
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-brand-navy py-24 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Let's build the future of dairy together.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base opacity-80">
            Whether you're sourcing premium dairy at scale or supplying high-quality milk from your
            farm, we'd love to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#buyer"
              className="rounded-full bg-brand-teal px-7 py-3.5 text-sm font-semibold text-brand-teal-foreground transition hover:brightness-110"
            >
              Connect as a Buyer
            </a>
            <a
              href="#seller"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10"
            >
              Explore as a Seller
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-teal">
            Our story in pictures
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            From our farm to your family.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/10">
            <img
              src={bottomOne}
              alt="Athirshta Dairy: Pure goodness, farm-fresh every day"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-brand-navy/10">
            <img
              src={bottomTwo}
              alt="Athirshta Dairy collage — farm, factory, family"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Athirshtadairy. All rights reserved.</p>
          <p>Disrupting the food value chain with technology.</p>
        </div>
      </footer>
    </div>
  );
}
