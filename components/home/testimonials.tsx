import { testimonials } from "@/lib/homepage";

export function Testimonials() {
  return (
    <section className="bg-[#f0e4d3] py-24 text-neutral-950 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
              Avis clients
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Une présence maîtrisée dès le premier jour.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-700">
            Des stands conçus pour être montés, transportés et photographiés
            sans perdre leur niveau d’exigence.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-[8px] border border-neutral-950/10 bg-[#fffaf1]/72 p-7 shadow-[0_24px_70px_rgba(89,60,29,0.08)]"
            >
              <blockquote className="font-serif text-2xl leading-9 text-neutral-950">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="mt-8 text-sm text-neutral-600">
                <span className="block font-semibold text-neutral-950">
                  {testimonial.name}
                </span>
                {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
