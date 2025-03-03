/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { LocationDescription, PileLocator } from '@gamepark/react-game'

export class GloryStockLocator extends PileLocator {
  locationDescription = new GloryStockDescription()
  coordinates = { x: -23, y: -24 }
  radius = 1.5
}

export class GloryStockDescription extends LocationDescription {
  location = gloryStockLocation
  width = 9
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: -59, y: 18, z: 0 }
}

export const gloryStockLocation = { type: LocationType.GloryStock }

export const gloryStockLocator = new GloryStockLocator()
