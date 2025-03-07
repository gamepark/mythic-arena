import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { TokenDescription } from '@gamepark/react-game'
import NorseGlory from '../images/glory/majority-norse.png'
import GreekGlory from '../images/glory/majority-greek.png'
import { MajorityTokenHelp } from './help/MajorityTokenHelp'

export class MajorityGloryDescription extends TokenDescription {
  images = {
    [PantheonType.Norse]: NorseGlory,
    [PantheonType.Greek]: GreekGlory
  }
  height = 4.42
  width = 5.72

  help = MajorityTokenHelp
}


export const majorityGloryDescription = new MajorityGloryDescription()
