import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PantheonType } from '../material/PantheonType'
import { getCardRule } from './character/card.utils'
import { BattlefieldHelper } from './helper/BattlefieldHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AllegianceScoreRule extends PlayerTurnRule {
  onRuleStart() {
    if (new BattlefieldHelper(this.game).isComplete) return [this.startRule(RuleId.EndGame)]
    if (this.cardAllegiance === undefined || this.placedCard.length === 0) return [this.startRule(RuleId.EndOfTurn)]
    const moves: MaterialMove[] = []
    moves.push(...this.wonGloryPointMoves)
    moves.push(this.startRule(RuleId.EndOfTurn))
    return moves
  }

  get wonGloryPointMoves() {
    const placedCard = this.placedCard
    const { x, y } = placedCard.getItem()!.location

    const verticalAlignment = this.countVerticalAdjacentAllegiance(x!, y!)
    const horizontalAlignment = this.countHorizontalAdjacentAllegiance(x!, y!)
    let score = 0
    if (verticalAlignment === 3) score++
    if (horizontalAlignment === 3) score++
    if (score === 0) return []
    return [
      this.material(MaterialType.GloryPoint)
        .createItem({
          location: {
            type: LocationType.PlayerGlory,
            player: this.player
          }
        })
    ]
  }

  countHorizontalAdjacentAllegiance(x: number, y: number) {
    let count = 1
    const boundaries = new BattlefieldHelper(this.game).boundaries
    const allegiance = this.cardAllegiance
    for (let position = x; position >= boundaries.xMin; position--) {
      if (position === x) continue;
      if (!this.hasSameAllegianceOnRow(y, position, allegiance)) break
      count++
    }

    if (count > 3) return count

    for (let position = x; position <= boundaries.xMax; position++) {
      if (position === x) continue;
      if (!this.hasSameAllegianceOnRow(y, position, allegiance)) break
      count++
    }
    return count
  }

  countVerticalAdjacentAllegiance(x: number, y: number) {
    let count = 1
    const boundaries = new BattlefieldHelper(this.game).boundaries
    const allegiance = this.cardAllegiance
    for (let position = y; position >= boundaries.yMin; position--) {
      if (position === y) continue;
      if (!this.hasSameAllegianceOnColumn(x, position, allegiance)) break
      count++
    }

    if (count > 3) return count

    for (let position = y; position <= boundaries.yMax; position++) {
      if (position === y) continue;
      if (!this.hasSameAllegianceOnColumn(x, position, allegiance)) break
      count++
    }

    return count
  }

  hasSameAllegianceOnRow(y: number, position: number, allegiance: PantheonType): boolean {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.y === y && l.x === position)
    if (!card.length) return false;
    return getCardRule(this.game, card.getIndex())?.allegiance === allegiance;

  }

  hasSameAllegianceOnColumn(x: number, position: number, allegiance: PantheonType): boolean {
    const card = this.material(MaterialType.PantheonCard)
      .location((l) => l.type === LocationType.Battlefield && l.x === x && l.y === position)
    if (!card.length) return false;
    return getCardRule(this.game, card.getIndex())?.allegiance === allegiance;

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
}
