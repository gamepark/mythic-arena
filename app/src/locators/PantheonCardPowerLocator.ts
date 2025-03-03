import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardPowerLocator extends Locator {
  locationDescription = new PantheonCardPowerDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }
  positionOnParent = { x: 50, y: 30 }


  getItemRotateZ() {
    return 45
  }
}

class PantheonCardPowerDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }
}

export const pantheonCardPowerLocator = new PantheonCardPowerLocator()
