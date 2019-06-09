import * as jsonschema from "jsonschema"
import * as entityTypeDataFile from "./entity-type-data-file"

export const schema: jsonschema.Schema = {
  description: `Maps entity type identifiers to data files.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": entityTypeDataFile.schema
  }
}

/**
 * Maps entity type identifiers to data files.
 */
export type Type = {
  /**
   * A mapping of an entity type identifier to its corresponding data file.
   */
  readonly [column: string]: entityTypeDataFile.Type
}
