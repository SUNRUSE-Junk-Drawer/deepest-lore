import * as jsonschema from "jsonschema"
import * as identifierSet from "./identifier-set"
import * as localizedString from "./localized-string"

export const schema: jsonschema.Schema = {
  $schema: `http://json-schema.org/draft-04/schema#`,
  description: `A deepest-lore schema document.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `localizations`,
    `localizationName`,
    `title`,
    `description`,
  ],
  properties: {
    localizations: identifierSet.schema,
    localizationName: localizedString.schema,
    title: localizedString.schema,
    description: localizedString.schema
  }
}

export type Type = {
  readonly localizations: identifierSet.Type
  readonly localizationName: localizedString.Type
  readonly title: localizedString.Type
  readonly description: localizedString.Type
}
