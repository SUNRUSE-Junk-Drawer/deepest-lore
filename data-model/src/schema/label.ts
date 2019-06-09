import * as jsonschema from "jsonschema"
import * as labelPart from "./label-part"

export const schema: jsonschema.Schema = {
  description: `A list of chains of column identifiers which can be followed to find values which are concatenated to build a label.`,
  type: `array`,
  items: labelPart.schema
}

/**
 * A list of chains of column identifiers which can be followed to find values
 * which are concatenated to build a label.
 */
export type Type = ReadonlyArray<labelPart.Type>
