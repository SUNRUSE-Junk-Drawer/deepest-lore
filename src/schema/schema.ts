import * as jsonschema from "jsonschema"
import * as identifierSet from "./../shared/identifier-set"
import * as localizedString from "./../shared/localized-string"
import * as entityTypeSet from "./entity-type-set"
import * as mappingSet from "./mapping-set"

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
    `entityTypes`,
    `mappings`
  ],
  properties: {
    localizations: identifierSet.schema,
    localizationName: localizedString.schema,
    title: localizedString.schema,
    description: localizedString.schema,
    entityTypes: entityTypeSet.schema,
    mappings: mappingSet.schema
  }
}

/**
 * A deepest-lore schema document.
 */
export type Type = {
  /**
   * The identifiers of the localizations used within the document.
   */
  readonly localizations: identifierSet.Type

  /**
   * Maps localization identifiers to the names of those localizations.
   */
  readonly localizationName: localizedString.Type

  /**
   * Maps localization identifiers to the title of the document in those
   * localizations.
   */
  readonly title: localizedString.Type

  /**
   * Maps localization identifiers to the description of the document in those
   * localizations.
   */
  readonly description: localizedString.Type

  /**
   * Maps entity type identifiers to schemas.
   */
  readonly entityTypes: entityTypeSet.Type

  /**
   * Maps mapping identifiers to schemas.
   */
  readonly mappings: mappingSet.Type
}
