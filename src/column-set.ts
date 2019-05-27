import * as jsonschema from "jsonschema"
import * as column from "./column"

export const schema: jsonschema.Schema = {
  description: `Maps column identifiers to schemas.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": column.schema
  }
}

/**
 * Maps column identifiers to schemas.
 */
export type Type = {
  /**
   * A mapping of a column identifier to its corresponding schema.
   */
  readonly [column: string]: string
}
