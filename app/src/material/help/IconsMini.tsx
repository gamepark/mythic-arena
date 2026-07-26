import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import AfterBattleEffectIcon from '../../images/icons/after-battle-icon.png'
import EndEffectIcon from '../../images/icons/end-icon.png'
import PlayEffectIcon from '../../images/icons/place-icon.png'
import { powerTokenDescription } from '../PowerTokenDescription'
import { shatteredShieldTokenDescription } from '../ShatteredShieldTokenDescription'

export const alignIcon = css`
    height: 1.5em;
    position: relative;
    border-radius: 0.1em;
    top: 0.4em;
    margin-top: -0.3em;
`

export const IconsMini = {
  'play': <Picture css={alignIcon} src={PlayEffectIcon}/>,
  'afterbattle': <Picture css={alignIcon} src={AfterBattleEffectIcon}/>,
  'end': <Picture css={alignIcon} src={EndEffectIcon}/>,
  'shattered': <Picture css={alignIcon} src={shatteredShieldTokenDescription.image}/>,
  'power': <Picture css={alignIcon} src={powerTokenDescription.image}/>
}
