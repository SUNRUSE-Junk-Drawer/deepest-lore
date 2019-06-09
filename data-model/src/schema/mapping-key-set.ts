import * as jsonschema from "jsonschema"
import * as mappingKey from "./mapping-key"

export const schema: jsonschema.Schema = {
  description: `Maps mapping key identifiers to schemas.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": mappingKey.schema
  }
}

/**
 * Maps mapping key identifiers to schemas.
 */
export type Type = {
  /**
   * A mapping of a mapping key identifier to its corresponding schema.
   */
  readonly [column: string]: mappingKey.Type
}
