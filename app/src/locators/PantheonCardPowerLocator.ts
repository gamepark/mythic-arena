import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'

export class PantheonCardPowerLocator extends Locator {
  locationDescription = new PantheonCardPowerDescription()
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }

  getPositionOnParent(location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return super.getPositionOnParent(location, context)
    const count = this.countItems(location, context)
    console.log("Count", count)
    const baseX = 50 - ((count - 1) * 10 )
    return { x: baseX + 20   * location.x!, y: 30 }
  }


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
