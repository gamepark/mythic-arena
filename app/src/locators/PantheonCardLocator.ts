import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardLocator extends Locator {
  locationDescription = new PantheonCarLocationDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }

  getPositionOnParent(_location: Location) {
    return { x: 50, y: 63 }
  }
}

class PantheonCarLocationDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }
}

export const pantheonCardLocator = new PantheonCardLocator()
