import * as jsonschema from "jsonschema"
import * as mappingDataFileRow from "./mapping-data-file-row"

export const schema: jsonschema.Schema = {
  description: `The contents of a mapping's data file.`,
  type: `array`,
  items: mappingDataFileRow.schema
}

/**
 * The contents of a mapping's data file.
 */
export type Type = ReadonlyArray<mappingDataFileRow.Type>
