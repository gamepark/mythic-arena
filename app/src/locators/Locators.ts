import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { Locator } from '@gamepark/react-game'
import { allegianceStockLocator } from './AllegianceStockLocator'
import { battlefieldLocator } from './BattlefieldLocator'
import { pantheonCardLocator } from './PantheonCardLocator'
import { pantheonDeckLocator } from './PantheonDeckLocator'
import { pantheonDiscardLocator } from './PantheonDiscardLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerStrengthTokenLocator } from './PlayerStrengthTokenLocator'
import { strengthTokenStockLocator } from './StrengthTokenStockLocator'

export const Locators: Partial<Record<LocationType, Locator<PantheonType, MaterialType, LocationType>>> = {
  [LocationType.Battlefield]: battlefieldLocator,
  [LocationType.PantheonDeck]: pantheonDeckLocator,
  [LocationType.PantheonDiscard]: pantheonDiscardLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.AllegianceStock]: allegianceStockLocator,
  [LocationType.PantheonCard]: pantheonCardLocator,
  [LocationType.StrengthTokenStock]: strengthTokenStockLocator,
  [LocationType.PlayerStrengthStock]: playerStrengthTokenLocator
}
