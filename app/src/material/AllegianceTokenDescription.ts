import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Norse from '../images/allegency/norse.jpg'
import Greek from '../images/allegency/greek.jpg'

export class AllegianceTokenDescription extends RoundTokenDescription {
  diameter = 2.2

  images = {
    [PantheonType.Norse]: Norse,
    [PantheonType.Greek]: Greek
  }

  getStockLocation = (item: MaterialItem) => ({
    type: LocationType.AllegianceStock,
    player: item.id
  })

  staticItems = [
    { quantity: 20, id: PantheonType.Norse, location: { type: LocationType.AllegianceStock, player: PantheonType.Norse }},
    { quantity: 20, id: PantheonType.Greek, location: { type: LocationType.AllegianceStock, player: PantheonType.Greek }},
  ]
}

export const allegianceTokenDescription = new AllegianceTokenDescription()
