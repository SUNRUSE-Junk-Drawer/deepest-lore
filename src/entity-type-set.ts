import * as jsonschema from "jsonschema"
import * as entityType from "./entity-type"

export const schema: jsonschema.Schema = {
  description: `Maps entity type identifiers to schemas.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": entityType.schema
  }
}

/**
 * Maps entity type identifiers to schemas.
 */
export type Type = {
  /**
   * A mapping of an entity type identifier to its corresponding schema.
   */
  readonly [column: string]: entityType.Type
}
