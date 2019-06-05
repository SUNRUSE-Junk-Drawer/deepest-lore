import * as fs from "fs"
import * as path from "path"
import * as neatCsv from "neat-csv"
import * as dataModel from "@deepest-lore/data-model"

export default async function (
  basePath: string
): Promise<dataModel.Imported> {
  const promises = await Promise.all([
    importSchema(),
    importData()
  ])

  return {
    schema: promises[0],
    data: promises[1]
  }

  async function importSchema(): Promise<dataModel.Schema> {
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

  async function importData(): Promise<dataModel.Data> {
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
  ): Promise<dataModel.EntityTypeDataFileSet> {
    const output: {
      [entityType: string]: dataModel.EntityTypeDataFile
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
