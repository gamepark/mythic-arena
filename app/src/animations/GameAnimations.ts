import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move(isDeleteItemType(MaterialType.PantheonCard))
  .none()
