# `@deepest-lore/fs-import` [![Travis](https://img.shields.io/travis/deepest-lore/fs-import.svg)](https://travis-ci.org/deepest-lore/fs-import) [![License](https://img.shields.io/github/license/deepest-lore/fs-import.svg)](license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Ffs-import.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Ffs-import?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@deepest-lore/fs-import.svg)](https://www.npmjs.com/package/@deepest-lore/fs-import) [![npm type definitions](https://img.shields.io/npm/types/@deepest-lore/fs-import.svg)](https://www.npmjs.com/package/@deepest-lore/fs-import)

Imports deepest-lore schemas and data from JSON and CSV files on disk.

## File structure

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

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdeepest-lore%2Ffs-import.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdeepest-lore%2Ffs-import?ref=badge_large)
