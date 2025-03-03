import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { Direction, Location, MaterialItem } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardShatteredShieldLocator extends Locator {
  locationDescription = new PantheonCardShatteredShieldDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }

  getPositionOnParent(location: Location) {
    if (location.id === Direction.North) return { x: 50, y: 10 }
    if (location.id === Direction.South) return { x: 50, y: 90 }
    if (location.id === Direction.East) return { x: 90, y: 35 }
    if (location.id === Direction.West) return { x: 10, y: 35 }
    return { x: 50, y: 63 }
  }

  getItemRotateZ(item: MaterialItem) {
    if (item.location.id === Direction.North) return -135
    if (item.location.id === Direction.West) return 135
    if (item.location.id === Direction.North) return -45
    return -45
  }
}

class PantheonCardShatteredShieldDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }
}

export const pantheonCardShatteredShieldLocator = new PantheonCardShatteredShieldLocator()
