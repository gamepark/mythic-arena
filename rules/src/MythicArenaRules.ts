import { hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PantheonType } from './material/PantheonType'
import { RuleId } from './rules/RuleId'
import { TheFirstStepRule } from './rules/TheFirstStepRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class MythicArenaRules extends SecretMaterialRules<PantheonType, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PantheonType, MaterialType, LocationType>, MaterialMove<PantheonType, MaterialType, LocationType>, PantheonType> {
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.PantheonCard]: {
      [LocationType.PantheonDeck]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.PantheonCard]: {
      [LocationType.PantheonDeck]: hideFront
    }
  }



  giveTime(): number {
    return 60
  }
}
