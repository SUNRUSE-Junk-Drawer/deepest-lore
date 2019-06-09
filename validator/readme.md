# `@deepest-lore/validator` [![Travis](https://img.shields.io/travis/deepest-lore/validator.svg)](https://travis-ci.org/deepest-lore/validator) [![License](https://img.shields.io/github/license/deepest-lore/validator.svg)](license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fvalidator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fvalidator?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@deepest-lore/validator.svg)](https://www.npmjs.com/package/@deepest-lore/validator) [![npm type definitions](https://img.shields.io/npm/types/@deepest-lore/validator.svg)](https://www.npmjs.com/package/@deepest-lore/validator)

Validates that deepest-lore schemas (and optionally data) are consistent with
themselves and one another.

## Checks performed

### Errors raised on failure

- The schema document matches the JSON schema.
- All entity reference columns reference an existing entity type.
- All entity reference column defaults refer to an existing instance of their
  referenced entity type.
- All entity reference column values refer to an existing instance of their
  referenced entity type.
- All mapping keys reference existing entity types in schema.
- All mapping keys reference existing entity instances of their referenced
  entity type in data.
- All entity type labels are resolvable; each run is a chain of existing entity
  reference columns, excepting the last, which is any existing column on the
  final entity.
- All localized values include every localization defined at the root of the
  schema document.
- All integer column maximum values are at least their minimum values.
- All integer column default values fall between (inclusively) their minimum and
  maximum values.
- All integer column values fall between (inclusively) their minimum and maximum
  values.
- All float column maximum values are at least their minimum values.
- All float column default values fall between (inclusively) their minimum and
  maximum values.
- All float column values fall between (inclusively) their minimum and maximum
  values.
- All string column default values fit within their maximum length.
- All string column values fit within their maximum length.

### Warnings raised on failure.

- Localized values include no localizations not defined at the root of the
  schema document.
- No unexpected columns are found within entity type or mapping data.
- All entity types have at least one instance.
- All mappings have at least one instance.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fvalidator.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fvalidator?ref=badge_large)
