import * as jsonschema from "jsonschema"
import * as mappingDataFile from "./mapping-data-file"

export const schema: jsonschema.Schema = {
  description: `Maps mapping identifiers to data files.`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[_a-z0-9]{6}$": mappingDataFile.schema
  }
}

/**
 * Maps mapping identifiers to data files.
 */
export type Type = {
  /**
   * A mapping of an mapping identifier to its corresponding data file.
   */
  readonly [column: string]: mappingDataFile.Type
}
