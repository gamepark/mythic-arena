import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { allegianceTokenDescription } from './AllegianceTokenDescription'
import { gloryDescription } from './GloryDescription'
import { pantheonCardDescription } from './PantheonCardDescription'
import { powerTokenDescription } from './PowerTokenDescription'
import { shatteredShieldTokenDescription } from './ShatteredShieldTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.PantheonCard]: pantheonCardDescription,
  [MaterialType.AllegianceToken]: allegianceTokenDescription,
  [MaterialType.Power]: powerTokenDescription,
  [MaterialType.ShatteredShield]: shatteredShieldTokenDescription,
  [MaterialType.GloryPoint]: gloryDescription
}
