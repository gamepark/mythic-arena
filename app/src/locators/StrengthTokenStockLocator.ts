import { DropAreaDescription, PileLocator } from '@gamepark/react-game'

export class StrengthTokenStockLocator extends PileLocator {
  radius = 2
  coordinates = { x: -27, y: -20 }


  locationDescription = new DropAreaDescription({ height: 15, width: 15 })
}

export const strengthTokenStockLocator = new StrengthTokenStockLocator()
