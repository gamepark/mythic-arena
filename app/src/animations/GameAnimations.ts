import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { MaterialAnimationContext, MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType, MaterialMove } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move: MaterialMove, context: MaterialAnimationContext) =>
    isDeleteItemType(MaterialType.PantheonCard)(move) &&
    [PantheonCard.Hela, PantheonCard.Hades].includes(context.rules.game.items[move.itemType]![move.itemIndex].id?.front)
  )
  .none()
