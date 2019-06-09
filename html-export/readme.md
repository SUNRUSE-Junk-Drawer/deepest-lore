# `@deepest-lore/html-export` [![Travis](https://img.shields.io/travis/deepest-lore/html-export.svg)](https://travis-ci.org/deepest-lore/html-export) [![License](https://img.shields.io/github/license/deepest-lore/html-export.svg)](license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fhtml-export.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fhtml-export?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@deepest-lore/html-export.svg)](https://www.npmjs.com/package/@deepest-lore/html-export) [![npm type definitions](https://img.shields.io/npm/types/@deepest-lore/html-export.svg)](https://www.npmjs.com/package/@deepest-lore/html-export)

Exports deepest-lore schemas and data to wiki-like HTML.

## File structure

### `/index.html`

Shows the schema document's description and a list of all entity types.

### `/entity-types/{entity type identifier}/index.html`

Shows the entity type's description and a list of all its instances.

### `/entity-types/{entity type identifier}/instances/{entity instance identifier}`

Shows the entity instance's column values and a list of all entity and mapping instances which reference it.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fhtml-export.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fhtml-export?ref=badge_large)
