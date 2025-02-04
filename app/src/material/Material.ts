import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { pantheonCardDescription } from './PantheonCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.PantheonCard]: pantheonCardDescription
}
