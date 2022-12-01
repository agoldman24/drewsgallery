export enum Medium {
  COLORED_PENCIL = "Colored Pencil",
  ACRYLIC_PAINT = "Acrylic Paint",
  WATER_COLOR = "Water Color",
  INK = "Ink",
  CHARCOAL = "Charcoal",
  OIL_PASTEL = "Oil Pastel",
}

export const defaultMediums = {
  [Medium.COLORED_PENCIL]: true,
  [Medium.ACRYLIC_PAINT]: true,
  [Medium.WATER_COLOR]: true,
  [Medium.INK]: true,
  [Medium.CHARCOAL]: true,
  [Medium.OIL_PASTEL]: true,
};

export const emptyMediums = {
  [Medium.COLORED_PENCIL]: false,
  [Medium.ACRYLIC_PAINT]: false,
  [Medium.WATER_COLOR]: false,
  [Medium.INK]: false,
  [Medium.CHARCOAL]: false,
  [Medium.OIL_PASTEL]: false,
};
