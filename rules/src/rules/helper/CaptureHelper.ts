import { Material, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class CaptureHelper extends PlayerTurnRule {

  persistCapturedCardCoordinates(card: Material) {
    this.memorize(Memory.CapturedCoordinates, (c: XYCoordinates[] = []) => {
      const item = card.getItem()!
      c.push({ x: item.location.x!, y: item.location.y! })
      return c
    })
  }

  captureCard(card: Material) {
    const moves: MaterialMove[] = []
    const existingToken = this.material(MaterialType.AllegianceToken).parent(card.getIndex())
    if (existingToken.length) {
      moves.push(existingToken.moveItem({
        type: LocationType.AllegianceStock,
        player: existingToken.getItem()!.id
      }))
    }

    if (existingToken.length && existingToken.getItem()!.id !== this.player) return moves

    // Add the token
    moves.push(
      this
        .material(MaterialType.AllegianceToken)
        .location(LocationType.AllegianceStock)
        .player(this.player)
        .moveItem({
          type: LocationType.PantheonCardAllegiance,
          parent: card.getIndex()
        })
    )

    return moves
  }
}
