import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardAllegianceLocator extends Locator {
  locationDescription = new PantheonCardAllegianceDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }
  positionOnParent = { x: 50, y: 63 }
}

class PantheonCardAllegianceDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }
}

export const pantheonCardAllegianceLocator = new PantheonCardAllegianceLocator()
