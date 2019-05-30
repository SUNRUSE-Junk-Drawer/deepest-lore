import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"

export const schema: jsonschema.Schema = {
  description: `A row of a mapping's imported data file.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^\\$[_a-z0-9]{6}$": identifier.schema,
    "^[_a-z0-9]{6}$": {
      description: `An unlocalized column's value.`,
      type: `string`
    },
    "^[_a-z0-9]{6}:[_a-z0-9]{6}$": {
      description: `A column's value in a specific localization.`,
      type: `string`
    }
  }
}

/**
 * A row of a mapping's imported data file.
 */
export type Type = {
  /**
   * The columns of the row.  Expected keys are:
   * - $key_id        The identifier of the mapped entity.
   * - column         An unlocalized column's value.
   * - column:locali  A column's value in a specific localization.
   */
  readonly [key: string]: string
}
