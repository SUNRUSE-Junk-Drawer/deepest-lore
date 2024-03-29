import * as fs from "fs"
import * as path from "path"
import * as neatCsv from "neat-csv"
import * as schema from "./data-model/schema/schema"
import * as entityTypeDataFile from "./data-model/csv/entity-type-data-file"
import * as entityTypeDataFileSet from "./data-model/csv/entity-type-data-file-set"
import * as data from "./data-model/csv/data"
import * as imported from "./data-model/imported"

export default async function (
  basePath: string
): Promise<imported.Type> {
  const promises = await Promise.all([
    importSchema(),
    importData()
  ])

  return {
    schema: promises[0],
    data: promises[1]
  }

  async function importSchema(): Promise<schema.Type> {
    let json: string
    try {
      json = await fs.promises.readFile(path.join(basePath, `schema.json`), `utf8`)
    } catch (e) {
      throw new Error(`The schema document cannot be read.`)
    }

    try {
      return JSON.parse(json)
    } catch (e) {
      throw new Error(`The schema document cannot be parsed.`)
    }
  }

  async function importData(): Promise<data.Type> {
    const promises = await Promise.all([
      importDataFiles(`entity type`, `entity-types`),
      importDataFiles(`mapping`, `mappings`)
    ])
    return {
      entityTypes: promises[0],
      mappings: promises[1]
    }
  }

  async function importDataFiles(
    description: string,
    subPath: string
  ): Promise<entityTypeDataFileSet.Type> {
    const output: {
      [entityType: string]: entityTypeDataFile.Type
    } = {}
    let names: ReadonlyArray<string>
    try {
      names = await fs.promises.readdir(path.join(basePath, subPath))
    } catch (e) {
      throw new Error(`The ${description} data directory cannot be searched.`)
    }
    await Promise.all(names
      .filter(name => name.endsWith(`.csv`))
      .map(async name => {
        const csv = await neatCsv(fs.createReadStream(path.join(basePath, subPath, name)))
        const csvAsBaseObjects = csv.map(row => {
          const output: { [key: string]: string } = {}
          Object.keys(row).map(key => output[key] = row[key])
          return output
        })
        output[name.slice(0, name.length - 4)] = csvAsBaseObjects
      }))
    return output
  }
}
