/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../../material/PantheonCardDescription'

export class BattlefieldDescription extends DropAreaDescription {

  constructor() {
    super(pantheonCardDescription)
  }

  getExtraCss(location: Location, _context: MaterialContext) {
    return battlefieldSquareCss(location)
  }

  extraCss = css`
    border: 0.05em solid white;
  `

}

const battlefieldSquareCss = (location: Location) => css`
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
    &:before {
        //content: '${location.x} / ${location.y}';
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        color: white;
        font-size: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
`
