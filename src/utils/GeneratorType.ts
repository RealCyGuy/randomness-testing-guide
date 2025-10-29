export type GeneratorType = {
  name: string;
  generate: (nbits: number) => string;
};
