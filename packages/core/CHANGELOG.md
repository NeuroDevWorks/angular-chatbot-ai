# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-06-18

### Added
- Initial release of @neurodevworks/chatbot-core
- AIClientService for multi-provider AI integration
- Support for OpenAI GPT models (GPT-3.5, GPT-4)
- Support for Anthropic Claude models
- Support for Google Gemini models
- Real-time streaming responses with RxJS observables
- Comprehensive TypeScript type definitions
- Error handling and retry logic
- Message history management
- Configurable AI client options
- Token streaming with tokenStream$ observable
- Response completion with responseComplete$ observable
- Angular service integration
- Full test coverage
- Documentation and examples

### Features
- **Multi-AI Provider Support**: OpenAI, Claude, Gemini
- **Streaming Responses**: Real-time token streaming
- **TypeScript First**: Full type safety
- **Reactive Architecture**: Built with RxJS
- **Error Handling**: Comprehensive error management
- **Configurable**: Flexible configuration options

### Technical Details
- Built with Angular 18+
- RxJS 7.8+ for reactive programming
- TypeScript 5.5+ for type safety
- ESM and CommonJS module support
- Tree-shakable exports
- Optimized bundle size

### Dependencies
- eventsource-parser: ^1.1.1 (for streaming support)

### Peer Dependencies
- @angular/core: ^18.0.0
- @angular/common: ^18.0.0
- rxjs: ^7.8.0
