export const MARKET_CAP_BOUNDARIES = {
  //above this: low risk
  LARGE: 100_000_000_000,
  //in between these: big caps, safe
  MEDIUM: 7_000_000_000,
  // inbetween these: alts
  SMALL: 350_000_000,
  // lower than this: gambling
};

export const SUGGESTED_RANGES = {
  low: {
    lower: 40,
    upper: 60,
  },
  medium: {
    lower: 30,
    upper: 40,
  },
  high: {
    lower: 15,
    upper: 25,
  },
  gambling: {
    lower: 0,
    upper: 5,
  },
};
