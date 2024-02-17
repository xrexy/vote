export const countries = Object.freeze(["BG", "TUR", "MA", "JP", 'US', 'USA'] as const)

export type Country = typeof countries[number]

export const countryNames = Object.freeze({
  BG: "Bulgaria",
  TUR: "Turkey",
  MA: "Morocco",
  JP: "Japan",
  US: "United States",
  USA: "United States"
} as const satisfies Record<Country, string>)
