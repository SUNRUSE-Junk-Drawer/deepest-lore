import * as jsonschema from "jsonschema"
import * as mapping from "./mapping"

export const schema: jsonschema.Schema = {
  description: `Maps mapping identifiers to schemas.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": mapping.schema
  }
}

/**
 * Maps mapping identifiers to schemas.
 */
export type Type = {
  /**
   * A mapping of a mapping identifier to its corresponding schema.
   */
  readonly [mapping: string]: mapping.Type
}
