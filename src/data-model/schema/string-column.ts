import * as jsonschema from "jsonschema"
import * as localizedString from "./../shared/localized-string"

export const schema: jsonschema.Schema = {
  description: `A string column.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `type`,
    `label`,
    `maximumLength`,
    `default`
  ],
  properties: {
    type: {
      description: `Identifies the type of the column.`,
      enum: [`string`]
    },
    label: localizedString.schema,
    maximumLength: {
      description: `The maximum length of acceptable values for the column, in UTF-8 bytes, including a NULL terminator.`,
      type: `integer`,
      minimum: 1
    },
    default: localizedString.schema
  }
}

/**
 * A string column.
 */
export type Type = {
  /**
   * Identifies the type of the column.
   */
  readonly type: `string`

  /**
   * Maps localization identifiers to the name of the column in those
   * localizations.
   */
  readonly label: localizedString.Type

  /**
   * The maximum length of acceptable values for the column, in UTF-8 bytes,
   * including a NULL terminator.
   */
  readonly maximumLength: number

  /**
   * Maps localization identifiers to the default value of the column for
   * instances which do not specify a value in those localizations.
   */
  readonly default: localizedString.Type
}
