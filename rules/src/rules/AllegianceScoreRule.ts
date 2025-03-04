import { Material, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import sum from 'lodash/sum'
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
    const linesOrColumns: number[][] = []
    if (this.cardAllegiance !== undefined && this.placedCard.length) {
      this.fillWithCompletedLinesOrColumns(linesOrColumns, this.placedCard)
    }

    const capturedCoordinates = this.capturedCardCoordinates
    if (capturedCoordinates.length) {
      for (const coordinates of capturedCoordinates) {
        const card = this
          .material(MaterialType.PantheonCard)
          .location((l) => l.type === LocationType.Battlefield && l.x === coordinates.x && l.y === coordinates.y)
        this.fillWithCompletedLinesOrColumns(linesOrColumns, card)
      }
    }

    if (linesOrColumns.length) {
      const scoring = this.wonGloryPoints(linesOrColumns)
      moves.push(
        this.material(MaterialType.GloryPoint)
          .createItem({
            id: 1,
            location: {
              type: LocationType.PlayerGlory,
              player: this.player
            },
            quantity: scoring
          })
      )
    }


    moves.push(this.startRule(RuleId.EndOfTurn))
    return moves
  }

  wonGloryPoints(linesOrColumns: number[][]) {
    let scoring = linesOrColumns.length

    for (const indexes of linesOrColumns) {
      scoring += sum(
        indexes.map((index) => getCardRule(this.game, index)?.gloryPointBonus)
      )
    }

    return scoring
  }

  fillWithCompletedLinesOrColumns(linesOrColumns: number[][], card: Material) {
    const item = card.getItem()!
    const { x, y } = item.location

    const verticalAlignment = this.getVerticalAdjacentAllegiance(x!, y!)
    const horizontalAlignment = this.getHorizontalAdjacentAllegiance(x!, y!)
    const newColumn = [card.getIndex(), ...verticalAlignment].sort()
    if (newColumn.length === 3 && !linesOrColumns.some((indexes) => isEqual(indexes, newColumn))) {
      linesOrColumns.push(newColumn)
    }

    const newRow = [card.getIndex(), ...horizontalAlignment].sort()
    if (newRow.length === 3 && !linesOrColumns.some((indexes) => isEqual(indexes, newRow))) {
      linesOrColumns.push(newRow)
    }

    return linesOrColumns
  }

  getHorizontalAdjacentAllegiance(x: number, y: number): number[] {
    let adjacentItems: number[] = []
    const boundaries = new BattlefieldHelper(this.game).outerSquareBoundaries
    const allegiance = this.cardAllegiance
    for (let position = x; position >= boundaries.xMin; position--) {
      if (position === x) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnRow(y, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem)
    }

    if (adjacentItems.length > 2) return []

    for (let position = x; position <= boundaries.xMax; position++) {
      if (position === x) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnRow(y, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem)
    }

    return adjacentItems.sort()
  }

  getVerticalAdjacentAllegiance(x: number, y: number): number[] {
    let adjacentItems: PantheonCard[] = []
    const boundaries = new BattlefieldHelper(this.game).outerSquareBoundaries
    const allegiance = this.cardAllegiance
    for (let position = y; position >= boundaries.yMin; position--) {
      if (position === y) continue;
      const adjacentItem = this.getItemIfSameAllegianceOnColumn(x, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem)
    }

    if (adjacentItems.length > 2) return []

    for (let position = y; position <= boundaries.yMax; position++) {
      if (position === y) continue;
      if (!this.getItemIfSameAllegianceOnColumn(x, position, allegiance)) break
      const adjacentItem = this.getItemIfSameAllegianceOnColumn(x, position, allegiance)
      if (adjacentItem === undefined) break
      adjacentItems.push(adjacentItem)
    }

    return adjacentItems.sort()
  }

  getItemIfSameAllegianceOnRow(y: number, position: number, allegiance: PantheonType): number | undefined {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.y === y && l.x === position)
    if (!card.length) return;
    if (getCardRule(this.game, card.getIndex())?.allegiance === allegiance) return card.getIndex()
    return
  }

  getItemIfSameAllegianceOnColumn(x: number, position: number, allegiance: PantheonType): number | undefined {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.x === x && l.y === position)
    if (!card.length) return;
    if (getCardRule(this.game, card.getIndex())?.allegiance === allegiance) return card.getIndex()
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
