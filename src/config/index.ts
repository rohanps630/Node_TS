import * as dotenv from "dotenv";

interface EnvVar {
  [key: string]: string;
}

interface EnvInterface {
  load(): void;
  get(key: string): string | undefined;
  getOrDefault(key: string, defaultValue: string): string;
  require(keyOrKeys: string | string[]): void;
}

class Env implements EnvInterface {
  private vars: EnvVar = {};
  private loaded = false;

  constructor() {
    if (Env.instance) {
      return Env.instance;
    }

    Env.instance = this;
  }

  private static instance: Env;

  load(): void {
    if (this.loaded) {
      return;
    }

    const result = dotenv.config();

    if (result.error) {
      throw new Error(
        `Failed to load env vars from .env file: ${result.error}`
      );
    }

    for (const [key, value] of Object.entries(process.env)) {
      this.vars[key.toUpperCase()] = value;
    }

    this.loaded = true;
  }

  get(key: string): string | undefined {
    this.load();
    return this.vars[key.toUpperCase()];
  }

  getOrDefault(key: string, defaultValue: string): string {
    this.load();
    return this.vars[key.toUpperCase()] ?? defaultValue;
  }

  require(keyOrKeys: string | string[]): void {
    this.load();

    const keys: string[] = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

    for (const key of keys) {
      const value = this.vars[key.toUpperCase()];
      if (value === undefined) {
        throw new Error(`Required env var "${key}" is missing!`);
      }
    }
  }
}

export default new Env();
