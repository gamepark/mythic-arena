import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCardRule } from './PantheonCardRule'

export class Eir extends PantheonCardRule {
  afterBattle() {
    const tokens = this.strengthTokens
    const wonTokens = Math.min(tokens.length, 2)
    if (!tokens.length || tokens.length < wonTokens) return []
    const activePlayer = this.game.rule?.player
    if (!activePlayer) return []

    return [
      this.strengthTokens
        .moveItem({
          type: LocationType.PlayerStrengthStock,
          player: activePlayer,
        }, wonTokens)
    ]
  }

  get strengthTokens() {
    return this.material(MaterialType.StrengthToken)
  }
}
