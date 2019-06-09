import * as jsonschema from "jsonschema"
import * as identifier from "./../shared/identifier"

export const schema: jsonschema.Schema = {
  description: `A row of an entity type's imported data file.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^\\$$": identifier.schema,
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
 * A row of an entity type's imported data file.
 */
export type Type = {
  /**
   * The columns of the row.  Expected keys are:
   * - $              The entity's primary key.
   * - column         An unlocalized column's value.
   * - column:locali  A column's value in a specific localization.
   */
  readonly [key: string]: string
}
