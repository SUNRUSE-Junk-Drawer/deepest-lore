# `deepest-lore` [![Travis](https://img.shields.io/travis/SUNRUSE/deepest-lore.svg)](https://travis-ci.org/SUNRUSE/deepest-lore) [![License](https://img.shields.io/github/license/SUNRUSE/deepest-lore.svg)](license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fcli.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fcli?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/deepest-lore.svg)](https://www.npmjs.com/package/deepest-lore) [![npm type definitions](https://img.shields.io/npm/types/deepest-lore.svg)](https://www.npmjs.com/package/deepest-lore)

Tools for creating and managing your deepest lore.

## Data model

`deepest-lore` uses a mini-"relational database", wherein information is
organized into tables of rows and columns.

### Entity

An entity represents a "thing", with a unique, invariant identifier.

For instance, you might have an entity per recipe, or per ingredient.

### Mapping

A mapping specifies information for a unique combination of entities.

For instance, you might map ingredients to recipes.

### Identifier

An identifier is a string 6 characters in length using the character set
`_abcdefghijklmnopqrstuvwxyz0123456789`.

These would usually not be shown to the end-user, but instead be used to keep
consistent references between versions.  As such, they should be invariant
(never change).

#### Binary representation

Identifiers can be stored as an unsigned 32-bit integer.

The range 0-4095999999 is reserved for current and future characters, but the
range 4096000000-4294967295 will never be generated from a six-character string,
and can safely be used for "special" values.

##### Examples

| Six-character string | 32-bit integer |
|----------------------|----------------|
| `______`             | 0              |
| `zzzzzz`             | 3780923076     |
| `for_eg`             | 1704192617     |

### Localizations

Schema documents define a set of localizations, which have identifiers.

Any information which is localized is then specified once per localization,
keyed by its identifier.

## Disk import

All files are expected to be UTF-8 encoded.

### `{base directory}/schema.json`

The schema, as defined in [@deepest-lore/data-model](https://www.npmjs.com/package/@deepest-lore/data-model).

### `{base directory}/entities/{entity type identifier}.csv`

Each row defines a single entity instance while the first row defines the
columns.  The following patterns are supported:

| Pattern         | Meaning                                                                                          |
|-----------------|--------------------------------------------------------------------------------------------------|
| `$`             | The column defines the entity instance's unique identifier.                                      |
| `col_id`        | The column defines the value of unlocalized entity type column `col_id`.                         |
| `col_id:loc_id` | The column defines the value of localized entity type column `col_id` for localization `loc_id`. |

#### Example

```csv
$,name__:en_gb_,name__:fr_fr_,catgry,weapon,food__,salqty,weight
grpfrt,Grapefruit,Pamplemousse,fruit_,❌,✔️,1,5
lemon_,Lemon,Citron,fruit_,TRUE,Yes,4,2
pebble,Pebble,Caillou,rock__,FALSE,No,50,1
```

| $      | name__:en_gb_ | name__:fr_fr_ | catgry | weapon | food__ | salqty | weight |
|--------|---------------|---------------|--------|--------|--------|--------|--------|
| grpfrt | Grapefruit    | Pamplemousse  | fruit_ | ❌      | ✔️      | 1      | 5      |
| lemon_ | Lemon         | Citron        | fruit_ | TRUE   | Yes    | 4      | 2      |
| pebble | Pebble        | Caillou       | rock__ | FALSE  | No     | 50     | 1      |

### `{base directory}/mappings/{mapping identifier}.csv`

Similarly to entity type files, each row defines a single mapping while the
first row defines the columns.  The following patterns are supported:

| Pattern         | Meaning                                                                                          |
|-----------------|--------------------------------------------------------------------------------------------------|
| `$key_id`       | The column defines the mapping key `key_id`.                                                     |
| `col_id`        | The column defines the value of unlocalized entity type column `col_id`.                         |
| `col_id:loc_id` | The column defines the value of localized entity type column `col_id` for localization `loc_id`. |

#### Example

```csv
$item__,$vendor,price_
lemon_,grngcr,0.8
pebble,grngcr,0.5
grpfrt,grngcr,2.4
pebble,rocrus,0.4
```

| $item__ | $vendor | price_ |
|---------|---------|--------|
| lemon_  | grngcr  | 0.8    |
| pebble  | grngcr  | 0.5    |
| grpfrt  | grngcr  | 2.4    |
| pebble  | rocrus  | 0.4    |

## HTML export

### `/index.html`

Shows the schema document's description and a list of all entity types.

### `/entity-types/{entity type identifier}/index.html`

Shows the entity type's description and a list of all its instances.

### `/entity-types/{entity type identifier}/instances/{entity instance identifier}`

Shows the entity instance's column values and a list of all entity and mapping instances which reference it.

## Validation

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

## Command-line interface

Warnings will be printed but do not count as an error by default.

Example: `deepest-lore {parameters}`.

### Parameters

#### `--fs-import {path}`

The base directory from which to import; runs once then stops.  Exits on error
and returns a non-zero exit code.

Uses [@deepest-lore/fs-import](https://www.npmjs.com/package/@deepest-lore/fs-import).

#### `--fs-import-watch {path}`

The base directory from which to import; runs once then waits for changes before
running again until terminated by the user.  Aborts run but does not exit on
error.

Uses [@deepest-lore/fs-import-watch](https://www.npmjs.com/package/@deepest-lore/fs-import-watch).

#### `--warnings-as-errors`

When present, any warnings generated by
[@deepest-lore/validator](https://www.npmjs.com/package/@deepest-lore/validator)
will instead be treated as errors.  The standard error handling logic will then
apply.

#### `--html-export {path}`

The base directory to which to export; this will be deleted and replaced with a
new directory containing the exported HTML.

Watch builds will not be minified.

Uses [@deepest-lore/html-export](https://www.npmjs.com/package/@deepest-lore/html-export).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Fcli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Fcli?ref=badge_large)
