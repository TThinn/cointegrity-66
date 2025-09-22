/**
 * Feature flags for controlling application functionality
 */
export const FEATURES = {
  // Control visibility of Hunit client area
  // Set to true when ready to launch client functionality
  HUNIT_ENABLED: false,
} as const;

export type FeatureFlag = keyof typeof FEATURES;