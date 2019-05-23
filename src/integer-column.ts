import * as jsonschema from "jsonschema"
import * as localizedString from "./localized-string"

export const schema: jsonschema.Schema = {
  description: `An integer column.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `type`,
    `label`,
    `default`,
    `minimum`,
    `maximum`
  ],
  properties: {
    type: {
      description: `Identifies the type of the column.`,
      enum: [`integer`]
    },
    label: localizedString.schema,
    minimum: {
      description: `The inclusive lower bound of acceptable values for the column.`,
      type: `integer`
    },
    maximum: {
      description: `The inclusive upper bound of acceptable values for the column.`,
      type: `integer`
    },
    default: {
      description: `The default value of the column for instances which do not specify a value.`,
      type: `integer`
    }
  }
}

/**
 * An integer column.
 */
export type Type = {
  /**
   * Identifies the type of the column.
   */
  readonly type: `integer`

  /**
   * Maps localization identifiers to the name of the column in those
   * localizations.
   */
  readonly label: localizedString.Type

  /**
   * The inclusive lower bound of acceptable values for the column.
   */
  readonly minimum: number

  /**
   * The inclusive upper bound of acceptable values for the column.
   */
  readonly maximum: number

  /**
   * The default value of the column for instances which do not specify a value.
   */
  readonly default: number
}
