"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/money";
import {
  calculateCustomStandPrice,
  getCustomStandPriceBreakdown,
  type CustomStandConfig,
  type WoodFinish,
  type WoodType,
} from "@/lib/pricing";

type OptionKey = keyof CustomStandConfig["options"];
type LogoPreset = "fromagerie" | "epicerie" | "artisan" | "minimal";

const woodChoices: Array<{
  value: WoodType;
  label: string;
  note: string;
  textureClass: string;
}> = [
  {
    value: "oak",
    label: "Chêne",
    note: "Veinage noble, clair et premium",
    textureClass: "wood-oak",
  },
  {
    value: "pine",
    label: "Pin",
    note: "Naturel, lumineux et accessible",
    textureClass: "wood-pine",
  },
  {
    value: "walnut",
    label: "Noyer",
    note: "Sombre, raffiné, très haut de gamme",
    textureClass: "wood-walnut",
  },
];

const finishChoices: Array<{
  value: WoodFinish;
  label: string;
  note: string;
}> = [
  { value: "matte", label: "Mat", note: "Sobre, naturel, peu réfléchissant" },
  { value: "satin", label: "Satiné", note: "Équilibre premium, toucher doux" },
  { value: "oiled", label: "Huilé", note: "Veines renforcées, rendu chaud" },
];

const logoChoices: Array<{
  value: LogoPreset;
  label: string;
  brand: string;
  subline: string;
  mark: string;
}> = [
  {
    value: "fromagerie",
    label: "Fromagerie",
    brand: "La Fromagerie",
    subline: "Artisan fromager",
    mark: "✦",
  },
  {
    value: "epicerie",
    label: "Épicerie",
    brand: "Maison Olive",
    subline: "Épicerie fine",
    mark: "◆",
  },
  {
    value: "artisan",
    label: "Artisan",
    brand: "Atelier Brut",
    subline: "Savoir-faire",
    mark: "△",
  },
  {
    value: "minimal",
    label: "Minimal",
    brand: "Studio Nord",
    subline: "Collection marché",
    mark: "—",
  },
];

const optionChoices: Array<{
  key: OptionKey;
  label: string;
  description: string;
}> = [
  {
    key: "shelves",
    label: "Étagères",
    description: "Deux niveaux de présentation supplémentaires.",
  },
  {
    key: "storage",
    label: "Rangement",
    description: "Volume fermé pour stock et packaging.",
  },
  {
    key: "lighting",
    label: "LED intégrées",
    description: "Spots chauds pour produits et signalétique.",
  },
  {
    key: "wheels",
    label: "Roulettes",
    description: "Déplacement facile pendant montage et démontage.",
  },
  {
    key: "logoEngraving",
    label: "Logo visible",
    description: "Plaque, gravure ou façade personnalisée.",
  },
  {
    key: "installation",
    label: "Installation",
    description: "Montage sur site par notre atelier partenaire.",
  },
];

const defaultConfig: CustomStandConfig = {
  width: 220,
  height: 230,
  depth: 80,
  woodType: "oak",
  finish: "satin",
  options: {
    shelves: true,
    storage: true,
    lighting: true,
    wheels: false,
    logoEngraving: true,
    installation: false,
  },
};

export function CustomConfigurator() {
  const [config, setConfig] = useState<CustomStandConfig>(defaultConfig);
  const [logoPreset, setLogoPreset] = useState<LogoPreset>("fromagerie");
  const [brandName, setBrandName] = useState("La Fromagerie");
  const [tagline, setTagline] = useState("Artisan fromager");
  const [uploadedLogo, setUploadedLogo] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isRequestingQuote, setIsRequestingQuote] = useState(false);

  const price = useMemo(() => calculateCustomStandPrice(config), [config]);
  const breakdown = useMemo(() => getCustomStandPriceBreakdown(config), [config]);
  const selectedWood = woodChoices.find((wood) => wood.value === config.woodType) ?? woodChoices[0];
  const selectedFinish =
    finishChoices.find((finish) => finish.value === config.finish) ?? finishChoices[0];

  function updateDimension(
    key: "width" | "height" | "depth",
    value: number,
  ) {
    setConfig((current) => ({
      ...current,
      [key]: Math.min(Math.max(value, key === "depth" ? 40 : key === "width" ? 100 : 120), key === "width" ? 400 : key === "height" ? 280 : 160),
    }));
    resetMessages();
  }

  function updateWoodType(woodType: WoodType) {
    setConfig((current) => ({ ...current, woodType }));
    resetMessages();
  }

  function updateFinish(finish: WoodFinish) {
    setConfig((current) => ({ ...current, finish }));
    resetMessages();
  }

  function toggleOption(key: OptionKey) {
    setConfig((current) => ({
      ...current,
      options: {
        ...current.options,
        [key]: !current.options[key],
      },
    }));
    resetMessages();
  }

  function selectLogo(preset: LogoPreset) {
    const logo = logoChoices.find((choice) => choice.value === preset);

    setLogoPreset(preset);
    setBrandName(logo?.brand ?? brandName);
    setTagline(logo?.subline ?? tagline);
    setUploadedLogo("");
    resetMessages();
  }

  function uploadLogo(file: File | undefined) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedLogo(String(reader.result ?? ""));
      resetMessages();
    };
    reader.readAsDataURL(file);
  }

  function resetMessages() {
    setCartMessage("");
    setQuoteMessage("");
  }

  function addToCart() {
    const existing = JSON.parse(localStorage.getItem("atelier-cart") ?? "[]");
    const line = {
      id: `custom-${Date.now()}`,
      type: "custom",
      quantity: 1,
      config,
      branding: { brandName, tagline, logoPreset, hasUploadedLogo: Boolean(uploadedLogo) },
      price,
    };

    localStorage.setItem("atelier-cart", JSON.stringify([...existing, line]));
    setCartMessage("Configuration ajoutée au panier.");
  }

  async function requestQuote() {
    setIsRequestingQuote(true);
    setQuoteMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const quote = (await response.json()) as { price: number };

      setQuoteMessage(
        `Devis estimatif prêt : ${formatPrice(quote.price)}. Nous vous répondons sous 24 heures.`,
      );
    } catch {
      setQuoteMessage("Impossible de préparer le devis pour le moment.");
    } finally {
      setIsRequestingQuote(false);
    }
  }

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
      <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
        <ConfiguratorPanel eyebrow="01" title="Dimensions">
          <div className="grid gap-6">
            <DimensionControl
              label="Largeur"
              value={config.width}
              min={100}
              max={400}
              onChange={(value) => updateDimension("width", value)}
            />
            <DimensionControl
              label="Hauteur"
              value={config.height}
              min={120}
              max={280}
              onChange={(value) => updateDimension("height", value)}
            />
            <DimensionControl
              label="Profondeur"
              value={config.depth}
              min={40}
              max={160}
              onChange={(value) => updateDimension("depth", value)}
            />
          </div>
        </ConfiguratorPanel>

        <ConfiguratorPanel eyebrow="02" title="Bois & finition">
          <div className="grid gap-3 sm:grid-cols-3">
            {woodChoices.map((wood) => {
              const isSelected = config.woodType === wood.value;

              return (
                <button
                  key={wood.value}
                  type="button"
                  onClick={() => updateWoodType(wood.value)}
                  className={`min-h-36 rounded-[6px] border p-4 text-left transition duration-300 ${
                    isSelected
                      ? "border-neutral-950 bg-white shadow-[0_16px_38px_rgba(58,39,22,0.12)]"
                      : "border-neutral-950/10 bg-white/55 hover:border-neutral-950/35 hover:bg-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`wood-surface finish-satin mb-5 block h-12 rounded-[4px] shadow-inner ${wood.textureClass}`}
                  />
                  <span className="font-serif text-2xl">{wood.label}</span>
                  <span className="mt-3 block text-sm leading-5 text-neutral-600">
                    {wood.note}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {finishChoices.map((finish) => (
              <button
                key={finish.value}
                type="button"
                onClick={() => updateFinish(finish.value)}
                className={`rounded-[6px] border p-4 text-left transition duration-300 ${
                  config.finish === finish.value
                    ? "border-neutral-950 bg-neutral-950 text-white shadow-[0_16px_38px_rgba(58,39,22,0.12)]"
                    : "border-neutral-950/10 bg-white/55 hover:border-neutral-950/35 hover:bg-white"
                }`}
              >
                <span className="block text-sm font-semibold">{finish.label}</span>
                <span
                  className={`mt-2 block text-xs leading-5 ${
                    config.finish === finish.value ? "text-white/68" : "text-neutral-600"
                  }`}
                >
                  {finish.note}
                </span>
              </button>
            ))}
          </div>
        </ConfiguratorPanel>

        <ConfiguratorPanel eyebrow="03" title="Logo & branding">
          <div className="grid gap-3 sm:grid-cols-4">
            {logoChoices.map((logo) => (
              <button
                key={logo.value}
                type="button"
                onClick={() => selectLogo(logo.value)}
                className={`rounded-[6px] border p-4 text-left transition duration-300 ${
                  logoPreset === logo.value && !uploadedLogo
                    ? "border-neutral-950 bg-white shadow-[0_16px_38px_rgba(58,39,22,0.12)]"
                    : "border-neutral-950/10 bg-white/55 hover:border-neutral-950/35 hover:bg-white"
                }`}
              >
                <span className="block text-xl">{logo.mark}</span>
                <span className="mt-3 block text-sm font-semibold">{logo.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Nom affiché
              <input
                value={brandName}
                onChange={(event) => {
                  setBrandName(event.target.value);
                  setUploadedLogo("");
                  resetMessages();
                }}
                className="min-h-11 rounded-[4px] border border-neutral-950/12 bg-white px-3 font-normal outline-none transition focus:border-neutral-950"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Signature
              <input
                value={tagline}
                onChange={(event) => {
                  setTagline(event.target.value);
                  setUploadedLogo("");
                  resetMessages();
                }}
                className="min-h-11 rounded-[4px] border border-neutral-950/12 bg-white px-3 font-normal outline-none transition focus:border-neutral-950"
              />
            </label>
          </div>
          <label className="mt-5 flex cursor-pointer flex-col gap-2 rounded-[6px] border border-dashed border-neutral-950/22 bg-white/62 p-4 text-sm font-semibold transition hover:border-neutral-950/45">
            Importer un logo PNG/JPG
            <span className="text-xs font-normal leading-5 text-neutral-600">
              Le logo importé s’affiche directement sur la façade du stand.
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => uploadLogo(event.target.files?.[0])}
              className="text-sm font-normal text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </label>
        </ConfiguratorPanel>

        <ConfiguratorPanel eyebrow="04" title="Options atelier">
          <div className="grid gap-3 sm:grid-cols-2">
            {optionChoices.map((option) => {
              const checked = Boolean(config.options[option.key]);

              return (
                <label
                  key={option.key}
                  className={`flex cursor-pointer gap-4 rounded-[6px] border p-4 transition duration-300 ${
                    checked
                      ? "border-neutral-950 bg-white shadow-[0_14px_34px_rgba(58,39,22,0.08)]"
                      : "border-neutral-950/10 bg-white/50 hover:border-neutral-950/35 hover:bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.key)}
                    className="mt-1 size-4 accent-neutral-950"
                  />
                  <span>
                    <span className="block text-sm font-semibold">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-neutral-600">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </ConfiguratorPanel>
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[10px] border border-neutral-950/10 bg-white text-neutral-950 shadow-[0_32px_90px_rgba(89,60,29,0.14)]">
          <div className="bg-[#17120d] p-5 text-white sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/48">
                Aperçu en direct
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/48">
                {config.width} x {config.height} x {config.depth} cm
              </p>
            </div>
            <StandPreview
              config={config}
              wood={selectedWood}
              finish={selectedFinish.value}
              brandName={brandName}
              tagline={tagline}
              logoPreset={logoPreset}
              uploadedLogo={uploadedLogo}
            />
          </div>

          <div className="grid gap-6 p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
                Prix estimatif
              </p>
              <p className="mt-3 font-serif text-6xl leading-none">
                {formatPrice(price)}
              </p>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                Estimation hors livraison spécifique. Le devis final confirme
                les finitions, délais et conditions d&apos;installation.
              </p>
            </div>
            <dl className="grid gap-3 border-y fine-divider py-5 text-sm">
              <SummaryRow label="Base atelier" value={formatPrice(breakdown.base)} />
              <SummaryRow label="Dimensions" value={formatPrice(breakdown.size)} />
              <SummaryRow label={`Bois ${selectedWood.label}`} value={formatPrice(breakdown.material)} />
              <SummaryRow label={`Finition ${selectedFinish.label}`} value={formatPrice(breakdown.finish)} />
              <SummaryRow label="Options" value={formatPrice(breakdown.options)} />
            </dl>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={addToCart}
                className="min-h-12 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,18,13,0.18)] transition hover:bg-neutral-800"
              >
                Ajouter au panier
              </button>
              <button
                type="button"
                onClick={requestQuote}
                disabled={isRequestingQuote}
                className="min-h-12 rounded-full border border-neutral-950/18 px-5 text-sm font-semibold transition hover:border-neutral-950 hover:bg-stone-50 disabled:cursor-wait disabled:opacity-60"
              >
                {isRequestingQuote ? "Préparation..." : "Demander un devis"}
              </button>
            </div>
            {cartMessage ? (
              <p className="text-sm font-semibold text-neutral-800">{cartMessage}</p>
            ) : null}
            {quoteMessage ? (
              <p className="rounded-[4px] bg-stone-100 p-4 text-sm leading-6 text-neutral-700">
                {quoteMessage}
              </p>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

type StandPreviewProps = {
  config: CustomStandConfig;
  wood: (typeof woodChoices)[number];
  finish: WoodFinish;
  brandName: string;
  tagline: string;
  logoPreset: LogoPreset;
  uploadedLogo: string;
};

function StandPreview({
  config,
  wood,
  finish,
  brandName,
  tagline,
  logoPreset,
  uploadedLogo,
}: StandPreviewProps) {
  const standWidth = 300 + ((config.width - 100) / 300) * 170;
  const standHeight = 220 + ((config.height - 120) / 160) * 70;
  const depth = 18 + ((config.depth - 40) / 120) * 26;
  const sheen =
    finish === "matte"
      ? "opacity-10"
      : finish === "satin"
        ? "opacity-20"
        : "opacity-32";
  const logoMark = logoChoices.find((logo) => logo.value === logoPreset)?.mark ?? "✦";
  const woodClass = `${wood.textureClass} finish-${finish}`;

  return (
    <div className="mt-6 overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_50%_12%,rgba(255,231,175,0.16),transparent_36%),#21160f] px-4 pb-8 pt-7">
      <div className="relative mx-auto flex min-h-[390px] max-w-[640px] items-end justify-center">
        <div className="absolute inset-x-4 bottom-0 h-16 rounded-[50%] bg-black/40 blur-xl" />
        <div
          className="relative transition-all duration-500"
          style={{
            width: `min(${standWidth}px, 94%)`,
            height: `${standHeight}px`,
            filter: "drop-shadow(0 30px 45px rgba(0,0,0,0.42))",
          }}
        >
          <div
            className={`wood-surface absolute bottom-[13%] left-[2%] h-[68%] w-[96%] rounded-[6px] border border-black/25 ${woodClass}`}
            style={{
              boxShadow: `${depth}px ${Math.round(depth * 0.62)}px 0 rgba(0,0,0,0.24)`,
            }}
          >
            <div className={`pointer-events-none absolute inset-0 z-[3] bg-white mix-blend-soft-light ${sheen}`} />
            <div className={`wood-surface absolute inset-x-[-1%] -top-[8%] h-[11%] rounded-[4px] border border-black/20 shadow-[0_12px_24px_rgba(0,0,0,0.16)] ${woodClass}`}>
              <div className={`pointer-events-none absolute inset-0 bg-white mix-blend-soft-light ${sheen}`} />
            </div>
            {config.options.lighting ? (
              <div className="absolute inset-x-[13%] top-[12%] z-[4] flex justify-between">
                {[0, 1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className="size-3 rounded-full bg-amber-200 shadow-[0_0_22px_rgba(252,211,77,0.95)]"
                  />
                ))}
              </div>
            ) : null}
            {config.options.shelves ? (
              <div className="absolute inset-x-[9%] top-[42%] z-[4] h-2 rounded-full bg-[#f8e8c5]/58 shadow-[0_42px_0_rgba(248,232,197,0.45)]" />
            ) : null}
            {config.options.storage ? (
              <div className="absolute inset-x-[8%] bottom-[7%] z-[4] h-[20%] rounded-[3px] border border-black/20 bg-black/12" />
            ) : null}
            {config.options.logoEngraving ? (
              <LogoPreview
                brandName={brandName}
                tagline={tagline}
                logoMark={logoMark}
                uploadedLogo={uploadedLogo}
              />
            ) : null}
          </div>

          <div className="absolute bottom-[10%] left-[5%] right-[5%] h-[5%] rounded-sm bg-neutral-950/82" />
          {config.options.wheels ? (
            <div className="absolute bottom-[5%] left-[13%] right-[13%] flex justify-between">
              <span className="size-6 rounded-full bg-neutral-950 ring-2 ring-white/25" />
              <span className="size-6 rounded-full bg-neutral-950 ring-2 ring-white/25" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type LogoPreviewProps = {
  brandName: string;
  tagline: string;
  logoMark: string;
  uploadedLogo: string;
};

function LogoPreview({
  brandName,
  tagline,
  logoMark,
  uploadedLogo,
}: LogoPreviewProps) {
  if (uploadedLogo) {
    return (
      <div className="absolute left-1/2 top-1/2 z-[5] flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center p-1">
        <span
          className="block size-full bg-contain bg-center bg-no-repeat drop-shadow-[0_8px_18px_rgba(0,0,0,0.26)]"
          style={{ backgroundImage: `url(${uploadedLogo})` }}
          aria-label="Logo importé"
        />
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 z-[5] flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f8e8c5]/34 bg-neutral-950/72 p-3 text-center text-[#f8e8c5] shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
      <span className="grid gap-1">
        <span className="text-lg leading-none">{logoMark}</span>
        <span className="line-clamp-2 text-[9px] font-bold uppercase leading-3 tracking-[0.12em]">
          {brandName || "Votre marque"}
        </span>
        <span className="truncate text-[7px] uppercase tracking-[0.1em] text-[#f8e8c5]/68">
          {tagline || "Signature"}
        </span>
      </span>
    </div>
  );
}

type ConfiguratorPanelProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

function ConfiguratorPanel({ eyebrow, title, children }: ConfiguratorPanelProps) {
  return (
    <fieldset className="premium-panel rounded-[8px] p-6 text-neutral-950 sm:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-7 flex items-baseline justify-between gap-4 border-b fine-divider pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6a2f]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl tracking-tight">{title}</h2>
      </div>
      {children}
    </fieldset>
  );
}

type DimensionControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function DimensionControl({
  label,
  value,
  min,
  max,
  onChange,
}: DimensionControlProps) {
  return (
    <label className="grid gap-3">
      <span className="flex items-center justify-between gap-4 text-sm font-semibold">
        {label}
        <span className="font-normal text-neutral-500">{value} cm</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-input accent-neutral-950"
      />
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="min-h-11 rounded-[4px] border border-neutral-950/12 bg-white px-3 text-sm outline-none transition focus:border-neutral-950"
      />
    </label>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
