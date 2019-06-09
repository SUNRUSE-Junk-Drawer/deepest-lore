import * as jsonschema from "jsonschema"
import * as localizedString from "./../shared/localized-string"

export const schema: jsonschema.Schema = {
  description: `A boolean column.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `type`,
    `label`,
    `default`
  ],
  properties: {
    type: {
      description: `Identifies the type of the column.`,
      enum: [`boolean`]
    },
    label: localizedString.schema,
    default: {
      description: `The default value of the column for instances which do not specify a value.`,
      type: `boolean`
    }
  }
}

/**
 * A boolean column.
 */
export type Type = {
  /**
   * Identifies the type of the column.
   */
  readonly type: `boolean`

  /**
   * Maps localization identifiers to the name of the column in those
   * localizations.
   */
  readonly label: localizedString.Type

  /**
   * The default value of the column for instances which do not specify a value.
   */
  readonly default: boolean
}
