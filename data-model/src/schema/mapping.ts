import * as jsonschema from "jsonschema"
import * as mappingKeySet from "./mapping-key-set"
import * as columnSet from "./column-set"

export const schema: jsonschema.Schema = {
  description: `A mapping between entity types.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `keys`,
    `columns`
  ],
  properties: {
    keys: mappingKeySet.schema,
    columns: columnSet.schema
  }
}

/**
 * A mapping between entity types.
 */
export type Type = {
  /**
   * Maps mapping key identifiers to schemas.
   */
  readonly keys: mappingKeySet.Type

  /**
   * Maps column identifiers to schemas.
   */
  readonly columns: columnSet.Type
}
