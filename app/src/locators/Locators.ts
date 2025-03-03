import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { Locator } from '@gamepark/react-game'
import { allegianceStockLocator } from './AllegianceStockLocator'
import { battlefieldLocator } from './BattlefieldLocator'
import { gloryStockLocator } from './GloryStockLocator'
import { majorityGloryPointLocator } from './MajorityGloryStockLocator'
import { pantheonCardAllegianceLocator } from './PantheonCardAllegianceLocator'
import { pantheonCardPowerLocator } from './PantheonCardPowerLocator'
import { pantheonCardShatteredShieldLocator } from './PantheonCardShatteredShieldLocator'
import { pantheonDeckLocator } from './PantheonDeckLocator'
import { pantheonDiscardLocator } from './PantheonDiscardLocator'
import { playerGloryLocator } from './PlayerGloryLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerMajorityGloryLocator } from './PlayerMajorityGloryLocator'
import { playerPowerLocator } from './PlayerPowerLocator'
import { playerShatteredShieldLocator } from './PlayerShatteredShieldLocator'
import { powerTokenStockLocator } from './PowerTokenStockLocator'
import { shatteredShieldTokenStockLocator } from './ShatteredShieldTokenStockLocator'

export const Locators: Partial<Record<LocationType, Locator<PantheonType, MaterialType, LocationType>>> = {
  [LocationType.Battlefield]: battlefieldLocator,
  [LocationType.PantheonDeck]: pantheonDeckLocator,
  [LocationType.PantheonDiscard]: pantheonDiscardLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.AllegianceStock]: allegianceStockLocator,
  [LocationType.PantheonCardAllegiance]: pantheonCardAllegianceLocator,
  [LocationType.PantheonCardPower]: pantheonCardPowerLocator,
  [LocationType.PantheonCardShatteredShield]: pantheonCardShatteredShieldLocator,
  [LocationType.PowerTokenStock]: powerTokenStockLocator,
  [LocationType.ShatteredShieldTokenStock]: shatteredShieldTokenStockLocator,
  [LocationType.PlayerPower]: playerPowerLocator,
  [LocationType.PlayerShatteredShield]: playerShatteredShieldLocator,
  [LocationType.GloryStock]: gloryStockLocator,
  [LocationType.MajorityGloryPoints]: majorityGloryPointLocator,
  [LocationType.PlayerGlory]: playerGloryLocator,
  [LocationType.PlayerMajorityGlory]: playerMajorityGloryLocator
}
