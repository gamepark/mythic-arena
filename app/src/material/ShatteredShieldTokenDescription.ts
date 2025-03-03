import { TokenDescription } from '@gamepark/react-game'
import ShatteredShield from '../images/strength/shattered-shield.jpg'

export class ShatteredShieldTokenDescription extends TokenDescription {
  height = 2.5
  width = 2.5
  image = ShatteredShield
}

export const shatteredShieldTokenDescription = new ShatteredShieldTokenDescription()
