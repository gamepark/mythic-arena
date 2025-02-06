import { Material, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class CaptureHelper extends PlayerTurnRule {

  persistCapturedCardCoordinates(card: Material) {
    this.memorize(Memory.CapturedCoordinates, (c: XYCoordinates[] = [])=> {
      const item = card.getItem()!
      c.push({ x: item.location.x!, y: item.location.y! })
      return c
    })
  }

  captureCard(card: Material) {
    new CaptureHelper(this.game).persistCapturedCardCoordinates(card)
    const moves: MaterialMove[] = []
    const existingToken = this.material(MaterialType.AllegianceToken).parent(card.getIndex())
    if (existingToken.length) {
      moves.push(existingToken.deleteItem())
    }

    if (existingToken.length && existingToken.getItem()!.id !== this.player) return moves

    // Add the token
    moves.push(
      this
        .material(MaterialType.AllegianceToken)
        .createItem({
          id: this.player,
          location: {
            type: LocationType.PantheonCard,
            parent: card.getIndex()
          }
        })
    )

    return moves
  }
}
