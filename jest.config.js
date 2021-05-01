module.exports = {
  preset: "blitz",
  collectCoverage: true,
  collectCoverageFrom: [
    // app
    "app/**/*.{ts,tsx}",
    // integrations
    "integrations/**/*.{ts,tsx}",
    // mailers
    "mailers/**/*.{ts,tsx}",
  ],
  coverageDirectory: ".coverage",
}
