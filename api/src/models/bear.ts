interface BearData {
  id: number
  name: string
}

type BearCreationData = Omit<BearData, 'id'>
type BearUpdateData = Partial<BearCreationData>

class Bear implements BearData {
  id: number
  name: string

  constructor(bearData: BearData) {
    this.id = bearData.id
    this.name = bearData.name
  }

  static list(): Bear[] {
    return [...Bear._bears.entries()].map(([id, data]) => new Bear({ id, ...data }))
  }

  static get(id: number): Bear | null {
    const data = Bear._bears.get(id)
    if (data == null) {
      return null
    }

    return new Bear({ id, ...data })
  }

  static add(data: BearCreationData): Bear {
    const lastId = Math.max(...[...Bear._bears.keys()])
    const newId = lastId + 1

    Bear._bears.set(newId, data)

    const bear = Bear.get(newId)!
    return bear
  }

  static update(id: number, data: BearUpdateData) {
    const _bear = Bear._bears.get(id)

    if (_bear == null) {
      return null
    }

    const cleanData = Object.fromEntries(Object.entries(data).filter(([k, v]) => v !== undefined)) as BearUpdateData
    Object.assign(_bear, cleanData)
    const bear = Bear.get(id)

    return bear
  }

  static remove(id: number) {
    const _bear = Bear._bears.get(id)

    if (_bear == null) {
      return null
    }
    const bear = Bear.get(id)

    Bear._bears.delete(id)

    return bear
  }

  private static _bears = new Map<number, BearCreationData>([
    [1, { name: 'Baloo' }],
    [2, { name: 'Bouba' }],
    [3, { name: 'Winnie' }]
  ])
}

export {
  Bear,
  BearCreationData,
  BearUpdateData
}
