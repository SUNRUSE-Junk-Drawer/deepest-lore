import * as jsonschema from "jsonschema"
import * as entityTypeDataFileSet from "./entity-type-data-file-set"
import * as mappingDataFileSet from "./mapping-data-file-set"

export const schema: jsonschema.Schema = {
  description: `A set of data files.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `entityTypes`,
    `mappings`
  ],
  properties: {
    entityTypes: entityTypeDataFileSet.schema,
    mappings: mappingDataFileSet.schema
  }
}

/**
 * A set of data files.
 */
export type Type = {
  /**
   * Maps entity type identifiers to data files.
   */
  readonly entityTypes: entityTypeDataFileSet.Type

  /**
   * Maps mapping identifiers to data files.
   */
  readonly mappings: mappingDataFileSet.Type
}
