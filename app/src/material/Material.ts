import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { allegianceTokenDescription } from './AllegianceTokenDescription'
import { pantheonCardDescription } from './PantheonCardDescription'
import { strengthTokenDescription } from './StrengthTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.PantheonCard]: pantheonCardDescription,
  [MaterialType.AllegianceToken]: allegianceTokenDescription,
  [MaterialType.StrengthToken]: strengthTokenDescription
}
