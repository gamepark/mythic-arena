import { MaterialGameSetup } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { greekCards, norseCards } from './material/PantheonCard'
import { PantheonType } from './material/PantheonType'
import { MythicArenaOptions } from './MythicArenaOptions'
import { MythicArenaRules } from './MythicArenaRules'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class MythicArenaSetup extends MaterialGameSetup<PantheonType, MaterialType, LocationType, MythicArenaOptions> {
  Rules = MythicArenaRules

  setupMaterial(_options: MythicArenaOptions) {
    this.setupPlayers()
  }

  setupPlayers() {
    this.setupPlayer(PantheonType.Greek)
    this.setupPlayer(PantheonType.Norse)
  }

  setupPlayer(player: PantheonType)  {
  const cards = player === PantheonType.Greek? greekCards: norseCards
    this.material(MaterialType.PantheonCard)
      .createItems(cards.map((g) => ({
        id: {
          back: player,
          front: g,
        },
        location: {
          type: LocationType.PantheonDeck,
          player: player
        }
      })))
  }

  start() {
    this.startPlayerTurn(RuleId.DrawCard, this.players[0])
  }
}
