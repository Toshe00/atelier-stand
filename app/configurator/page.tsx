import { CustomConfigurator } from "@/components/configurator/custom-configurator";

export default function ConfiguratorPage() {
  return (
    <section className="bg-[#f7f0e6] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6a2f]">
            Configurateur sur mesure
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
            Créez votre stand
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-700">
            Ajustez les dimensions, choisissez le bois, testez votre logo et
            obtenez un prix estimatif en direct.
          </p>
        </div>
        <CustomConfigurator />
      </div>
    </section>
  );
}
