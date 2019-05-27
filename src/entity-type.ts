import * as jsonschema from "jsonschema"
import * as localizedString from "./localized-string"
import * as columnSet from "./column-set"
import * as label from "./label"

export const schema: jsonschema.Schema = {
  description: `An entity type.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `singular`,
    `plural`,
    `label`,
    `columns`
  ],
  properties: {
    singular: localizedString.schema,
    plural: localizedString.schema,
    label: label.schema,
    columns: columnSet.schema
  }
}

/**
 * An entity type.
 */
export type Type = {
  /**
   * Maps localization identifiers to the name of the entity type, in singular
   * form, in those localizations.
   */
  readonly singular: localizedString.Type

  /**
  * Maps localization identifiers to the name of the entity type, in plural
  * form, in those localizations.
  */
  readonly plural: localizedString.Type

  /**
   * A list of chains of column identifiers which can be followed to find
   * values which are concatenated to build a label.
   */
  readonly label: label.Type

  /**
   * Maps column identifiers to schemas.
   */
  readonly columns: columnSet.Type
}
