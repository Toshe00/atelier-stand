export type WoodType = "oak" | "pine" | "walnut";
export type WoodFinish = "matte" | "satin" | "oiled";

export type CustomStandConfig = {
  width: number;
  height: number;
  depth: number;
  woodType: WoodType;
  finish: WoodFinish;
  options: {
    shelves?: boolean;
    storage?: boolean;
    lighting?: boolean;
    wheels?: boolean;
    logoEngraving?: boolean;
    installation?: boolean;
  };
};

const materialPremium: Record<WoodType, number> = {
  pine: 0,
  oak: 280,
  walnut: 640,
};

const finishPremium: Record<WoodFinish, number> = {
  matte: 0,
  satin: 160,
  oiled: 240,
};

const optionPrices: Record<keyof CustomStandConfig["options"], number> = {
  shelves: 220,
  storage: 340,
  lighting: 420,
  wheels: 180,
  logoEngraving: 260,
  installation: 520,
};

export function calculateCustomStandPrice(config: CustomStandConfig) {
  const base = 950;
  const volumeFactor = (config.width * config.height * config.depth) / 100000;
  const sizePrice = Math.round(volumeFactor * 42);
  const optionsPrice = Object.entries(config.options).reduce(
    (total, [key, enabled]) =>
      enabled ? total + optionPrices[key as keyof CustomStandConfig["options"]] : total,
    0,
  );

  return (
    base +
    sizePrice +
    materialPremium[config.woodType] +
    finishPremium[config.finish] +
    optionsPrice
  );
}

export function getCustomStandPriceBreakdown(config: CustomStandConfig) {
  const base = 950;
  const volumeFactor = (config.width * config.height * config.depth) / 100000;
  const size = Math.round(volumeFactor * 42);
  const material = materialPremium[config.woodType];
  const finish = finishPremium[config.finish];
  const options = Object.entries(config.options).reduce(
    (total, [key, enabled]) =>
      enabled ? total + optionPrices[key as keyof CustomStandConfig["options"]] : total,
    0,
  );

  return {
    base,
    size,
    material,
    finish,
    options,
    total: base + size + material + finish + options,
  };
}
