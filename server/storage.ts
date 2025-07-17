import type { Quote } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  saveQuote(quote: Quote): Promise<{ id: string; quote: Quote }>;
  getQuote(id: string): Promise<Quote | undefined>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;

  constructor() {
    this.quotes = new Map();
  }

  async saveQuote(quote: Quote): Promise<{ id: string; quote: Quote }> {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.quotes.set(id, quote);
    return { id, quote };
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }
}

export const storage = new MemStorage();
