import { MaterialItem, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PantheonCard } from '../material/PantheonCard'
import { PantheonType } from '../material/PantheonType'
import { getCardRule } from './character/card.utils'
import { BattlefieldHelper } from './helper/BattlefieldHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AllegianceScoreRule extends PlayerTurnRule {
  onRuleStart() {
    if (new BattlefieldHelper(this.game).isComplete) return [this.startRule(RuleId.EndGame)]
    const moves: MaterialMove[] = []
    const linesOrColumns: PantheonCard[][] = []
    if (this.cardAllegiance !== undefined && this.placedCard.length) {
      this.fillWithCompletedLinesOrColumns(linesOrColumns, this.placedCard.getItem()!)
    }

    const capturedCoordinates = this.capturedCardCoordinates
    if (capturedCoordinates.length) {
      for (const coordinates of capturedCoordinates) {
        const card = this
          .material(MaterialType.PantheonCard)
          .location((l) => l.type === LocationType.Battlefield && l.x === coordinates.x && l.y === coordinates.y)
          .getItem()!
        this.fillWithCompletedLinesOrColumns(linesOrColumns, card)
      }
    }

    if (linesOrColumns.length) {
      moves.push(
        this.material(MaterialType.GloryPoint)
          .createItem({
            location: {
              type: LocationType.PlayerGlory,
              player: this.player
            },
            quantity: linesOrColumns.length
          })
      )
    }


    moves.push(this.startRule(RuleId.EndOfTurn))
    return moves
  }

  fillWithCompletedLinesOrColumns(linesOrColumns: PantheonCard[][], card: MaterialItem) {
    const { x, y } = card.location

    const verticalAlignment = this.getVerticalAdjacentAllegiance(x!, y!)
    const horizontalAlignment = this.getHorizontalAdjacentAllegiance(x!, y!)
    const newColumn = [card.id.front, ...verticalAlignment].sort()
    if (newColumn.length === 3 && !linesOrColumns.some((ids) => isEqual(ids, newColumn))) {
      linesOrColumns.push(newColumn)
    }

    const newRow = [card.id.front, ...horizontalAlignment].sort()
    if (newRow.length === 3 && !linesOrColumns.some((ids) => isEqual(ids, newRow))) {
      linesOrColumns.push(newRow)
    }

    return linesOrColumns
  }

  getHorizontalAdjacentAllegiance(x: number, y: number): PantheonCard[] {
    let adjacentItems: PantheonCard[] = []
    const boundaries = new BattlefieldHelper(this.game).boundaries
    const allegiance = this.cardAllegiance
    for (let position = x; position >= boundaries.xMin; position--) {
      if (position === x) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnRow(y, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem.id.front)
    }

    if (adjacentItems.length > 2) return []

    for (let position = x; position <= boundaries.xMax; position++) {
      if (position === x) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnRow(y, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem.id.front)
    }

    return adjacentItems.sort()
  }

  getVerticalAdjacentAllegiance(x: number, y: number): PantheonCard[] {
    let adjacentItems: PantheonCard[] = []
    const boundaries = new BattlefieldHelper(this.game).boundaries
    const allegiance = this.cardAllegiance
    for (let position = y; position >= boundaries.yMin; position--) {
      if (position === y) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnColumn(x, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem.id.front)
    }

    if (adjacentItems.length > 2) return []

    for (let position = y; position <= boundaries.yMax; position++) {
      if (position === y) continue;
      if (!this.getItemIfSameAllegianceOnColumn(x, position, allegiance)) break
      const adjacentItem = this.getItemIfSameAllegianceOnColumn(x, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem.id.front)
    }

    return adjacentItems.sort()
  }

  getItemIfSameAllegianceOnRow(y: number, position: number, allegiance: PantheonType): MaterialItem | undefined {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.y === y && l.x === position)
    if (!card.length) return;
    if (getCardRule(this.game, card.getIndex())?.allegiance === allegiance) return card.getItem()
    return
  }

  getItemIfSameAllegianceOnColumn(x: number, position: number, allegiance: PantheonType): MaterialItem | undefined {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.x === x && l.y === position)
    if (!card.length) return;
    if (getCardRule(this.game, card.getIndex())?.allegiance === allegiance) return card.getItem()
    return
  }

  get cardAllegiance() {
    return getCardRule(this.game, this.placedCardIndex)?.allegiance
  }

  get placedCardIndex() {
    return this.remind(Memory.PlacedCard)
  }

  get placedCard() {
    return this.material(MaterialType.PantheonCard)
      .index(this.placedCardIndex)
  }

  get capturedCardCoordinates() {
    return this.remind<XYCoordinates[]>(Memory.CapturedCoordinates) ?? []
  }
}
