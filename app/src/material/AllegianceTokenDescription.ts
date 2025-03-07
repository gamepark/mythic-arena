import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { RoundTokenDescription } from '@gamepark/react-game'
import Greek from '../images/allegency/greek.jpg'
import Norse from '../images/allegency/norse.jpg'
import { AllegianceTokenHelp } from './help/AllegianceTokenHelp'

export class AllegianceTokenDescription extends RoundTokenDescription {
  diameter = 2.2

  images = {
    [PantheonType.Norse]: Norse,
    [PantheonType.Greek]: Greek
  }

  canDragToMove(): boolean {
    return false
  }

  canShortClick(): boolean {
    return false
  }

  canLongClick() {
    return false
  }

  help = AllegianceTokenHelp
}

export const allegianceTokenDescription = new AllegianceTokenDescription()
