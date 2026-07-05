import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/kk-logo.png.asset.json";
import canapes from "@/assets/canapes-spread.jpg.asset.json";
import plated from "@/assets/plated-curry.jpg.asset.json";
import buffet from "@/assets/buffet-chafing.jpg.asset.json";
import gold from "@/assets/gold-chafing.jpg.asset.json";
import lobola from "@/assets/lobola-buffet.jpg.asset.json";
import white from "@/assets/white-buffet.jpg.asset.json";
import goldLine from "@/assets/gold-line-buffet.jpg.asset.json";
import salads from "@/assets/salads-bowls.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:image", content: `https://id-preview--41fb6cf3-285c-4ae0-8943-ae7bcf28a60c.lovable.app${white.url}` },
      { name: "twitter:image", content: `https://id-preview--41fb6cf3-285c-4ae0-8943-ae7bcf28a60c.lovable.app${white.url}` },
    ],
  }),
});

const WA = "https://wa.me/27000000000?text=Hi%20Katleho%27s%20Kitchen%2C%20I%27d%20like%20to%20request%20a%20quote";
const TEL = "tel:+27000000000";

const services = [
  {
    title: "Weddings & Traditional Ceremonies",
    body: "Weddings, lobola & gifting luncheons, uMembeso — full buffet service worthy of the day.",
    img: lobola.url,
  },
  {
    title: "Milestone Celebrations",
    body: "Birthdays of all ages, graduation luncheons, housewarmings — plated with intention.",
    img: canapes.url,
  },
  {
    title: "Corporate & Community Events",
    body: "Launches, conferences, community gatherings across the region — dependable, elegant service.",
    img: goldLine.url,
  },
  {
    title: "Memorial & Send-Off Catering",
    body: "Dignified, respectful catering for funerals and memorial gatherings — one less thing to carry.",
    img: white.url,
  },
];

const galleryItems = [
  { src: lobola.url, cat: "Weddings & Traditional", caption: "Lobola celebration buffet · Kokstad", credit: "Decor by Angela Life Events" },
  { src: gold.url, cat: "Weddings & Traditional", caption: "Gold chafing service · Matatiele Golf Club", credit: null },
  { src: white.url, cat: "Milestones", caption: "Sweet 16 soirée · Mount Fletcher", credit: "Decor by Angela Life Events" },
  { src: canapes.url, cat: "Milestones", caption: "Canapé & finger-food styling", credit: "In collaboration with Flavorsome Bakes and Treats" },
  { src: plated.url, cat: "Corporate & Community", caption: "Plated mutton curry & yellow rice", credit: null },
  { src: goldLine.url, cat: "Weddings & Traditional", caption: "Full buffet line · outdoor reception", credit: "Styling with Nakin Events" },
  { src: buffet.url, cat: "Memorials", caption: "Send-off catering · Mount Fletcher", credit: null },
  { src: salads.url, cat: "Milestones", caption: "Salad selection · housewarming", credit: "Decor by Angela Life Events" },
];

const categories = ["All", "Weddings & Traditional", "Milestones", "Corporate & Community", "Memorials"];

function Index() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<null | (typeof galleryItems)[number]>(null);
  const filtered = cat === "All" ? galleryItems : galleryItems.filter((g) => g.cat === cat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={logo.url} alt="Katleho's Kitchen" className="h-10 w-auto" />
            <span className="font-display text-lg tracking-wide sm:block hidden">Katleho's Kitchen</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="#services" className="hover:text-gold transition-colors">Catering</a>
            <a href="#popups" className="hover:text-gold transition-colors">Pop-Ups</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#region" className="hover:text-gold transition-colors">Service Area</a>
            <a href="#enquire" className="hover:text-gold transition-colors">Enquire</a>
          </nav>
          <a href="#enquire" className="rounded-full bg-charcoal px-4 py-2 text-xs uppercase tracking-widest text-cream hover:opacity-90 transition-opacity">
            Request a Quote
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={white.url} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 py-24 md:py-40 text-center text-cream">
          <img src={logo.url} alt="Katleho's Kitchen monogram" className="mx-auto h-32 md:h-44 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]" />
          <div className="mt-2 mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-gold-soft/90">Est. Matatiele · Eastern Cape</div>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Trusted Catering for<br /><span className="italic text-gold">Life's Biggest Moments</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-cream/85">
            Beautifully presented buffet and canapé service across Matatiele, Mount Fletcher, Kokstad and the wider region.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#enquire" className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-charcoal hover:opacity-90 transition-opacity">
              Request a Quote
            </a>
            <a href="#popups" className="rounded-full border border-cream/70 px-7 py-3 text-sm font-medium text-cream hover:bg-cream/10 transition-colors">
              View Signature Experiences
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-5 py-20 md:py-28 text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-gold">About</div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">A regional catering house, built on real events.</h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Katleho's Kitchen has catered weddings, lobola and uMembeso celebrations, milestone birthdays,
          graduations, housewarmings and dignified memorial send-offs across the wider Matatiele region —
          working closely with the area's most trusted decor and event partners, foremost among them{" "}
          <span className="text-foreground font-medium">Angela Life Events</span>.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-gold">Catering Services</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Every occasion, handled with care.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <article key={s.title} className="group overflow-hidden rounded-lg bg-card shadow-sm border border-border/60">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Pop-Ups */}
      <section id="popups" className="relative bg-charcoal text-cream py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <img src={canapes.url} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-gold">Signature Pop-Ups</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Our own themed dining evenings.</h2>
            <p className="mt-5 text-cream/80 text-lg leading-relaxed">
              A limited-seat, ticketed series designed and hosted by Katleho's Kitchen in partnership with{" "}
              <span className="text-gold">Angela Life Events</span>. Original menus, considered styling, one evening only.
            </p>
          </div>
          <div className="rounded-lg border border-gold/40 bg-cream/5 p-8 backdrop-blur">
            <div className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-soft">Save the Date</div>
            <h3 className="mt-3 font-display text-3xl italic text-gold">Safari Apparel Evening</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-cream/15 pb-2"><dt className="text-cream/60">Concept</dt><dd>Safari-themed 5-course</dd></div>
              <div className="flex justify-between border-b border-cream/15 pb-2"><dt className="text-cream/60">Per person</dt><dd>R750</dd></div>
              <div className="flex justify-between border-b border-cream/15 pb-2"><dt className="text-cream/60">Styled by</dt><dd>Angela Life Events</dd></div>
              <div className="flex justify-between"><dt className="text-cream/60">Seats</dt><dd>Limited</dd></div>
            </dl>
            <a href={WA} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal hover:opacity-90 transition-opacity">
              Reserve a Seat
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-gold">Past Events</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Real spreads, real celebrations.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                  cat === c ? "border-gold bg-gold text-charcoal" : "border-border text-muted-foreground hover:border-gold hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <button
              key={g.src}
              onClick={() => setLightbox(g)}
              className="group text-left overflow-hidden rounded-lg bg-card border border-border/60"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={g.src} alt={g.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="font-medium">{g.caption}</p>
                {g.credit && <p className="mt-1 text-xs text-gold">{g.credit}</p>}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-gold">Why Katleho's Kitchen</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">A boutique catering standard, delivered.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Proven Across the Region", b: "Matatiele, Mount Fletcher, Kokstad, Maluti Township and beyond." },
              { t: "Beautifully Presented Food", b: "Gold-trimmed chafing service and styled canapés — not just mass catering." },
              { t: "Trusted Vendor Network", b: "Regular collaborations with Angela Life Events, Nakin Events and Flavorsome Bakes and Treats." },
              { t: "Every Occasion, Handled", b: "From weddings and lobola to dignified send-offs — always with care." },
            ].map((c) => (
              <div key={c.t} className="rounded-lg border border-border/60 bg-card p-6">
                <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display text-lg">✦</div>
                <h3 className="mt-4 font-display text-xl">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section id="region" className="mx-auto max-w-4xl px-5 py-20 md:py-28 text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-gold">Service Area</div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">Regional reach, local roots.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg font-display text-foreground/80">
          {["Matatiele", "Mount Fletcher", "Kokstad", "Maluti Township", "Matatiele Golf Club", "Surrounding Eastern Cape & KZN"].map((p) => (
            <span key={p} className="flex items-center gap-2"><span className="text-gold">◆</span>{p}</span>
          ))}
        </div>
      </section>

      {/* Enquire */}
      <section id="enquire" className="bg-charcoal text-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.35em] text-gold">Enquire</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Tell us about your event.</h2>
            <p className="mt-4 text-cream/70">We'll respond with a proposal shaped to your day.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const msg = `Hi Katleho's Kitchen%0A%0AEvent: ${fd.get("type")}%0ADate: ${fd.get("date")}%0AGuests: ${fd.get("guests")}%0ALocation: ${fd.get("location")}%0A%0A${fd.get("notes") || ""}%0A%0A- ${fd.get("name")}`;
              window.open(`https://wa.me/27000000000?text=${msg}`, "_blank");
            }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            <input required name="name" placeholder="Your name" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 placeholder:text-cream/40 focus:border-gold outline-none" />
            <select required name="type" defaultValue="" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 focus:border-gold outline-none">
              <option value="" disabled className="bg-charcoal">Event type</option>
              {services.map((s) => <option key={s.title} className="bg-charcoal">{s.title}</option>)}
              <option className="bg-charcoal">Signature Pop-Up Enquiry</option>
            </select>
            <input required name="date" type="date" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 focus:border-gold outline-none" />
            <input required name="guests" type="number" min={1} placeholder="Estimated guests" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 placeholder:text-cream/40 focus:border-gold outline-none" />
            <input required name="location" placeholder="Venue / town" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 placeholder:text-cream/40 focus:border-gold outline-none sm:col-span-2" />
            <textarea name="notes" rows={4} placeholder="Anything else we should know?" className="rounded-md bg-cream/5 border border-cream/20 px-4 py-3 placeholder:text-cream/40 focus:border-gold outline-none sm:col-span-2" />
            <button type="submit" className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal hover:opacity-90 sm:col-span-2">
              Send Enquiry via WhatsApp
            </button>
          </form>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-cream/80">
            <a href={WA} target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp us directly →</a>
            <span className="text-cream/30">·</span>
            <a href={TEL} className="hover:text-gold">Call Katleho's Kitchen</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-10 w-auto" />
            <span className="font-display text-base text-foreground">Katleho's Kitchen</span>
          </div>
          <p className="text-center">Trusted catering across Matatiele, Mount Fletcher & Kokstad.</p>
          <p>© {new Date().getFullYear()} Katleho's Kitchen</p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-4xl w-full">
            <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain rounded-lg" />
            <div className="mt-4 text-center text-cream">
              <p className="font-display text-xl">{lightbox.caption}</p>
              {lightbox.credit && <p className="mt-1 text-gold text-sm">{lightbox.credit}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
