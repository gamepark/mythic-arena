import { TokenDescription } from '@gamepark/react-game'
import Glory from '../images/glory/glory-1.png'
import { gloryStockLocation } from '../locators/GloryStockLocator'
import { GloryTokenHelp } from './help/GloryTokenHelp'

export class GloryDescription extends TokenDescription {
  image = Glory
  height = 3.35
  width = 2.2
  staticItem = { quantity: 15, location: gloryStockLocation, id: 1 }
  stockLocation = gloryStockLocation

  help = GloryTokenHelp
}


export const gloryDescription = new GloryDescription()
