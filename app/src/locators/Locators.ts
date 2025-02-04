import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PlayerColor } from '@gamepark/mythic-arena/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { battlefieldLocator } from './BattlefieldLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Battlefield]: battlefieldLocator
}
