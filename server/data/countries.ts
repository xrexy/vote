export const countries = Object.freeze(["BG", "TUR", "MA", "JP"] as const)

export type Country = typeof countries[number]

export const countryNames = Object.freeze({
  BG: "Bulgaria",
  TUR: "Turkey",
  MA: "Morocco",
  JP: "Japan",
} as const satisfies Record<Country, string>)
