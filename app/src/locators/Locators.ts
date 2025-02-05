import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { Locator } from '@gamepark/react-game'
import { battlefieldLocator } from './BattlefieldLocator'

export const Locators: Partial<Record<LocationType, Locator<PantheonType, MaterialType, LocationType>>> = {
  [LocationType.Battlefield]: battlefieldLocator
}
