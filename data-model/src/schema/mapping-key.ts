import * as jsonschema from "jsonschema"
import * as identifier from "./../shared/identifier"
import * as localizedString from "./../shared/localized-string"

export const schema: jsonschema.Schema = {
  description: `A mapping's key (a reference to an entity type).`,
  type: `object`,
  additionalProperties: false,
  required: [
    `entityType`,
    `label`
  ],
  properties: {
    entityType: identifier.schema,
    label: localizedString.schema
  }
}

/**
 * A mapping's key (a reference to an entity type).
 */
export type Type = {
  /**
   * The identifier of the entity type referenced by the key.
   */
  readonly entityType: identifier.Type

  /**
   * Maps localization identifiers to the name of the mapping from the
   * perspective of the mapped entity, in plural form, in those localizations.
   */
  readonly label: localizedString.Type
}
