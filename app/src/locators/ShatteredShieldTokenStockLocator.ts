import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { shatteredShieldTokenDescription } from '../material/ShatteredShieldTokenDescription'

export class ShatteredShieldTokenStockLocator extends ListLocator {
  gap = { y: shatteredShieldTokenDescription.width! + 0.5 }
  coordinates = { x: -33 + shatteredShieldTokenDescription.width + 0.5, y: -24 }


  locationDescription = new DropAreaDescription({ height: 15, width: 15 })
}

export const shatteredShieldTokenStockLocator = new ShatteredShieldTokenStockLocator()
