# Data Model

## Identifier

An identifier is a string 6 characters in length using the character set
`_abcdefghijklmnopqrstuvwxyz0123456789`.

These would usually not be shown to the end-user, but instead be used to keep
consistent references between versions.  As such, they should be invariant
(never change).

### Binary representation

Identifiers can be stored as an unsigned 32-bit integer.

The range 0-4095999999 is reserved for current and future characters, but the
range 4096000000-4294967295 will never be generated from a six-character string,
and can safely be used for "special" values.

#### Examples

| Six-character string | 32-bit integer |
|----------------------|----------------|
| `______`             | 0              |
| `zzzzzz`             | 3780923076     |
| `for_eg`             | 1704192617     |

## Localizations

Schema documents define a set of localizations, which have identifiers.

Any information which is localized is then specified once per localization,
keyed by its identifier.
