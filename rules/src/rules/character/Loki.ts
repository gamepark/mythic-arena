import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { PantheonCardRule } from './PantheonCardRule'

export class Loki extends PantheonCardRule {
  afterBattle() {
    const tokens = this.strengthTokens
    const quantity = tokens.getQuantity()
    const wonTokens = Math.min(quantity, this.capturedCard.length)
    if (!wonTokens || !quantity || quantity < wonTokens) return []
    const activePlayer = this.game.rule?.player
    if (!activePlayer) return []

    return [
      this.strengthTokens
        .moveItem({
          type: LocationType.PlayerStrengthStock,
          player: activePlayer
        }, wonTokens)
    ]
  }

  get capturedCard() {
    return this.remind(Memory.CapturedCoordinates) ?? []
  }

  get strengthTokens() {
    return this.material(MaterialType.StrengthToken)
  }
}
