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
    this.setupStrengthToken()
    this.setupMajorityGlory()
  }

  setupMajorityGlory() {
    this.material(MaterialType.MajorityGloryPoint)
      .createItem({
        id: PantheonType.Greek,
        location: {
          type: LocationType.MajorityGloryPoints
        }
      })

    this.material(MaterialType.MajorityGloryPoint)
      .createItem({
        id: PantheonType.Norse,
        location: {
          type: LocationType.MajorityGloryPoints
        }
      })

  }

  setupStrengthToken() {
    this.material(MaterialType.Power)
      .createItem({
        location: {
          type: LocationType.PowerTokenStock
        },
        quantity: 3
      })

    this.material(MaterialType.ShatteredShield)
      .createItem({
        location: {
          type: LocationType.ShatteredShieldTokenStock
        },
        quantity: 3
      })
  }

  setupPlayers() {
    this.setupPlayer(PantheonType.Greek)
    this.setupPlayer(PantheonType.Norse)
  }

  setupPlayer(player: PantheonType) {
    const cards = player === PantheonType.Greek ? greekCards : norseCards
    this.material(MaterialType.PantheonCard)
      .createItems(cards.map((g) => ({
        id: {
          back: player,
          front: g
        },
        location: {
          type: LocationType.PantheonDeck,
          player: player
        }
      })))

    this.material(MaterialType.PantheonCard)
      .player(player)
      .shuffle()

    this.material(MaterialType.AllegianceToken)
      .createItem({
        id: player,
        location: {
          type: LocationType.AllegianceStock,
          player: player
        },
        quantity: 25
      })
  }

  start() {
    this.startPlayerTurn(RuleId.DrawCard, this.players[0])
  }
}
