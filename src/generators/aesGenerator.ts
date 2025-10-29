import CryptoJS from "crypto-js";
import { GeneratorType } from "@/src/utils/GeneratorType";

export const aesGenerator: GeneratorType = {
  name: "AES Generator",
  generate: (nbits: number) => {
    // Use a fixed key for deterministic output (for testing purposes)
    const key = CryptoJS.enc.Hex.parse("0");
    let counter = 0;
    let result = "";
    // AES block size is 128 bits (16 bytes)
    const blockSizeBits = 128;
    const blocksNeeded = Math.ceil(nbits / blockSizeBits);
    for (let i = 0; i < blocksNeeded; i++) {
      // Create counter block (128 bits)
      const counterBlock = CryptoJS.enc.Hex.parse(
        counter.toString(16).padStart(32, "0"),
      );
      // Encrypt the counter using AES in ECB mode (effectively CTR mode)
      const encrypted = CryptoJS.AES.encrypt(counterBlock, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding,
      });
      // Convert ciphertext to binary string
      const ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      for (let j = 0; j < ciphertext.length; j++) {
        const hexDigit = parseInt(ciphertext[j], 16);
        const binaryDigit = hexDigit.toString(2).padStart(4, "0");
        result += binaryDigit;
      }
      counter++;
    }
    // Trim to exactly nbits
    return result.substring(0, nbits);
  },
};
