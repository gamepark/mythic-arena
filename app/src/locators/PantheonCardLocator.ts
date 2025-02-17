import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { StrengthType } from '@gamepark/mythic-arena/material/StrengthType'
import { DropAreaDescription, isItemContext, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Direction, Location, MaterialItem } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardLocator extends Locator {
  locationDescription = new PantheonCarLocationDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }

  getPositionOnParent(location: Location, context: MaterialContext) {
    if (location.id === Direction.North) return { x: 50, y: 10 }
    if (location.id === Direction.South) return { x: 50, y: 90 }
    if (location.id === Direction.East) return { x: 90, y: 35 }
    if (location.id === Direction.West) return { x: 10, y: 35 }
    if (isItemContext(context) && context.type === MaterialType.StrengthToken) return { x: 50, y: 30 }

    return { x: 50, y: 63 }
  }

  getItemRotateZ(item: MaterialItem, context: ItemContext) {
    if (context.type === MaterialType.AllegianceToken) return super.getItemRotateZ(item, context)
    if (context.type === MaterialType.StrengthToken && item.location.rotation === StrengthType.Power)return 45
    if (item.location.id === Direction.North) return -135
    if (item.location.id === Direction.West) return 135
    if (item.location.id === Direction.North) return -45
    return -45
  }
}

class PantheonCarLocationDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }
}

export const pantheonCardLocator = new PantheonCardLocator()
