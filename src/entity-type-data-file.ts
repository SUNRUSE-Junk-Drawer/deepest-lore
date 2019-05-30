import * as jsonschema from "jsonschema"
import * as dataRow from "./entity-type-data-file-row"

export const schema: jsonschema.Schema = {
  description: `The contents of an entity type's data file.`,
  type: `array`,
  items: dataRow.schema
}

/**
 * The contents of an entity type's data file.
 */
export type Type = ReadonlyArray<dataRow.Type>
