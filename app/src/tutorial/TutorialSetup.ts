import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { MythicArenaSetup } from '@gamepark/mythic-arena/MythicArenaSetup'


export const me = PantheonType.Greek
export const opponent = PantheonType.Norse
const myCards = [PantheonCard.Aphrodite, PantheonCard.Dionysos, PantheonCard.Hera, PantheonCard.Asclepios]
const opponentCards = [PantheonCard.Ull, PantheonCard.Nerthus, PantheonCard.Balder, PantheonCard.Siegfried]


export class TutorialSetup extends MythicArenaSetup {

  setupPlayer(player: PantheonType) {
    super.setupPlayer(player)
    const cards = player === PantheonType.Greek ? myCards : opponentCards
    cards.forEach((card) =>
      this.getDeck(player)
        .id(({front}: any) => front === card)
        .moveItem({
          type: LocationType.PantheonDeck,
          player
        }))
  }

  getDeck(player: PantheonType) {
    return this
      .material(MaterialType.PantheonCard)
      .player(player)
  }
}
