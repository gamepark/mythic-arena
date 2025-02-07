import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { ItemContext, RoundTokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import Greek from '../images/allegency/greek.jpg'
import Norse from '../images/allegency/norse.jpg'

export class AllegianceTokenDescription extends RoundTokenDescription {
  diameter = 2.2

  images = {
    [PantheonType.Norse]: Norse,
    [PantheonType.Greek]: Greek
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (isMoveItemType(MaterialType.AllegianceToken)(move) && move.location.type === LocationType.AllegianceStock && move.itemIndex === context.index) return true
    return super.canShortClick(move, context)
  }
}

export const allegianceTokenDescription = new AllegianceTokenDescription()
