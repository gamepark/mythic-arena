/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription } from '@gamepark/react-game'
import { pantheonCardDescription } from '../../material/PantheonCardDescription'

export class BattlefieldDescription extends DropAreaDescription {

  constructor() {
    super(pantheonCardDescription)
  }

  extraCss = css`
      background-color: rgba(255, 255, 255, 0.4);
  `

  placeOnShortClick = true
}
