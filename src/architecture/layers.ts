// src/architecture/layers.ts
// Layer definitions and helpers
export enum Layer {
  INTERNAL = "internal",
  RUNTIME = "runtime",
  EXTERNAL = "external",
}

export function isMutableLayer(layer: Layer) {
  return layer === Layer.RUNTIME;
}
