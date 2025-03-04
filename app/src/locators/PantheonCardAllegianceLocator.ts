import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'

export class PantheonCardAllegianceLocator extends Locator {
  locationDescription = new DropAreaDescription({ width: 3, height: 3, borderRadius: 1 })
  parentItemType = MaterialType.PantheonCard

  coordinates = { x: 0, y: 0, z: 0 }
  positionOnParent = { x: 50, y: 63 }
}

export const pantheonCardAllegianceLocator = new PantheonCardAllegianceLocator()
