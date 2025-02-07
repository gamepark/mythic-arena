import { Location, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCard } from '../../material/PantheonCard'

export class TableauHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly maxSize: number = 4) {
    super(game)
  }

  get availableSpaces() {

    const availableSpaces: Location[] = []
    const boundaries = this.boundaries
    const playedCards = this.panorama.getItems()

    if (playedCards.length === 0) {
      availableSpaces.push({ type: LocationType.Battlefield, x: 0, y: 0, z: 0 })
    }


    const sol = this.getPantheonCard(PantheonCard.Sol)
    const helios = this.getPantheonCard(PantheonCard.Helios)
    playedCards.forEach(playedCard => {
      const coordinates = { x: playedCard.location.x, y: playedCard.location.y }
      const left = { x: playedCard.location.x! - 1, y: playedCard.location.y! }
      if (!playedCards.find(item => isAnyCardToTheLeft(item, coordinates)) && (boundaries.xMax - left.x < this.maxSize)/* && (left.y < boundaries.yMin? (boundaries.yMax - left.y < this.maxSize): (left.y - boundaries.yMin < this.maxSize))*/) {
        if ((boundaries.yMax - boundaries.yMin) < this.maxSize || ((sol?.location.y! !== left.y) && helios?.location.x! !== left.y)) {
          availableSpaces.push({ type: LocationType.Battlefield, x: left.x, y: left.y, z: 0 })
        }
      }

      const right = { x: playedCard.location.x! + 1, y: playedCard.location.y! }
      if (!playedCards.find(item => isAnyCardToTheRight(item, coordinates)) && (right.x - boundaries.xMin < this.maxSize)/* && (right.y < boundaries.yMin? (boundaries.yMax - right.y < this.maxSize): (right.y - boundaries.yMin < this.maxSize))*/) {
        if ((boundaries.yMax - boundaries.yMin) < this.maxSize || ((sol?.location.y! !== right.y) && helios?.location.x! !== right.y)) {
          availableSpaces.push({ type: LocationType.Battlefield, x: right.x, y: right.y, z: 0 })
        }
      }
      const below = { x: playedCard.location.x!, y: playedCard.location.y! + 1 }
      if (!playedCards.find(item => isAnyCardBelow(item, coordinates)) && (below.y - boundaries.yMin < this.maxSize)/* && (below.x < boundaries.xMin? (boundaries.xMax - below.x < this.maxSize): (below.x - boundaries.xMin < this.maxSize))*/) {
        if ((boundaries.xMax - boundaries.xMin) < this.maxSize || ((sol?.location.x! !== below.x) && helios?.location.x! !== below.x)) {
          availableSpaces.push({ type: LocationType.Battlefield, x: below.x, y: below.y, z: 0 })
        }
      }

      const above = { x: playedCard.location.x!, y: playedCard.location.y! - 1 }
      if (!playedCards.find(item => isAnyCardAbove(item, coordinates)) && (boundaries.yMax - above.y < this.maxSize)/* && (above.x < boundaries.xMin? (boundaries.xMax - above.x < this.maxSize): (above.x - boundaries.xMin < this.maxSize))*/) {
        if ((boundaries.xMax - boundaries.xMin) < this.maxSize || ((sol?.location.x! !== above.x) && helios?.location.x! !== above.x)) {
          availableSpaces.push({ type: LocationType.Battlefield, x: above.x, y: above.y, z: 0 })
        }
      }
    })


    return uniqBy(availableSpaces, (location) => JSON.stringify(location))
  }

  getPantheonCard(cardId: PantheonCard) {
    return this.panorama.id((id: any) => id.front === cardId).getItem()
  }

  get boundaries() {
    const panorama = this.panorama
    let xMin = panorama.minBy((item) => item.location.x!).getItem()?.location?.x ?? 0
    let xMax = panorama.maxBy((item) => item.location.x!).getItem()?.location?.x ?? 0
    let yMin = panorama.minBy((item) => item.location.y!).getItem()?.location?.y ?? 0
    let yMax = panorama.maxBy((item) => item.location.y!).getItem()?.location?.y ?? 0
    return {
      xMin,
      xMax,
      yMin,
      yMax
    }
  }

  get panorama() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }
}

export const isAnyCardToTheLeft = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! - 1 && slotToCheck.location.y === reference.y
}
export const isAnyCardToTheRight = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! + 1 && slotToCheck.location.y === reference.y
}
export const isAnyCardAbove = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! && slotToCheck.location.y === reference.y! - 1
}
export const isAnyCardBelow = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! && slotToCheck.location.y === reference.y! + 1
}
