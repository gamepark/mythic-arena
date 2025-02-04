/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../../material/PantheonCardDescription'

export class BattlefieldDescription extends DropAreaDescription {

  constructor() {
    super(pantheonCardDescription)
  }

  getExtraCss(location: Location, context: MaterialContext) {
    const extra = super.getExtraCss(location, context)
    if (location.x === undefined && location.y === undefined) return [battlefieldSquareCss]
    return extra
  }

  extraCss = css`
    border: 0.05em solid white;
  `

}

const battlefieldSquareCss = css`
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none
`

export const battlefieldDescription = new BattlefieldDescription()
