import { ProviderConfig } from './types';

// Provider registry to store configurations
export const providerRegistry = new Map<string, any>();

// Register providers function
export function registerProviders(providers: ProviderConfig): void {
  // Store provider configurations
  for (const [providerName, config] of Object.entries(providers)) {
    providerRegistry.set(providerName, config);
  }
}

// Get provider configuration
export function getProviderConfig(providerName: string): any {
  return providerRegistry.get(providerName);
}

// Check if provider is registered
export function isProviderRegistered(providerName: string): boolean {
  return providerRegistry.has(providerName);
}

// Get all registered providers
export function getRegisteredProviders(): string[] {
  return Array.from(providerRegistry.keys());
}

// Clear all providers
export function clearProviders(): void {
  providerRegistry.clear();
}
