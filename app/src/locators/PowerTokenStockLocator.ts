import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { powerTokenDescription } from '../material/PowerTokenDescription'

export class PowerTokenStockLocator extends ListLocator {
  coordinates = { x: -33, y: -24 }
  gap = { y: powerTokenDescription.width + 0.5 }


  locationDescription = new DropAreaDescription({ height: 15, width: 15 })
}

export const powerTokenStockLocator = new PowerTokenStockLocator()
