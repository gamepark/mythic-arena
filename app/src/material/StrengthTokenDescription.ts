import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import Power1 from '../images/strength/power-1.jpg'
import ShatteredShield from '../images/strength/shattered-shield.jpg'

export class StrengthTokenDescription extends TokenDescription {
  height = 2.5
  image = Power1
  backImage = ShatteredShield

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (isMoveItemType(MaterialType.AllegianceToken)(move) && move.location.type === LocationType.AllegianceStock && move.itemIndex === context.index) return true
    return super.canShortClick(move, context)
  }
}

export const strengthTokenDescription = new StrengthTokenDescription()
