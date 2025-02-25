import { TokenDescription } from '@gamepark/react-game'
import Glory from '../images/glory/glory-1.png'
import { gloryStockLocation } from '../locators/GloryStockLocator'

export class GloryDescription extends TokenDescription {
  image = Glory
  height = 3.013
  width = 2.2
  staticItem = { quantity: 20, location: gloryStockLocation }
  stockLocation = gloryStockLocation
}


export const gloryDescription = new GloryDescription()