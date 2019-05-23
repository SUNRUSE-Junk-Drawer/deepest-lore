import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"
import * as localizedString from "./localized-string"

export const schema: jsonschema.Schema = {
  description: `An entity reference column.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `type`,
    `label`,
    `entityType`,
    `default`
  ],
  properties: {
    type: {
      description: `Identifies the type of the column.`,
      enum: [`entityReference`]
    },
    label: localizedString.schema,
    entityType: identifier.schema,
    default: identifier.schema
  }
}

/**
 * An entity reference column.
 */
export type Type = {
  /**
   * Identifies the type of the column.
   */
  readonly type: `entityReference`

  /**
   * Maps localization identifiers to the name of the column in those
   * localizations.
   */
  readonly label: localizedString.Type

  /**
   * The identifier of the entity type referenced by the column.
   */
  readonly entityType: identifier.Type

  /**
   * The default value of the column for instances which do not specify a value.
   */
  readonly default: identifier.Type
}
