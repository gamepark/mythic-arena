import { hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PantheonType } from './material/PantheonType'
import { AllegianceScoreRule } from './rules/AllegianceScoreRule'
import { BattleResolutionRule } from './rules/BattleResolutionRule'
import { DrawCardRule } from './rules/DrawCardRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { PlaceCardRule } from './rules/PlaceCardRule'
import { PlayEffectRule } from './rules/PlayEffectRule'
import { PlayStrengthTokenRule } from './rules/PlayStrengthTokenRule'
import { PostBattleEffectRule } from './rules/PostBattleEffectRule'
import { RuleId } from './rules/RuleId'
import { SecondChanceRule } from './rules/SecondChanceRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class MythicArenaRules extends SecretMaterialRules<PantheonType, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PantheonType, MaterialType, LocationType>, MaterialMove<PantheonType, MaterialType, LocationType>, PantheonType> {
  rules = {
    [RuleId.DrawCard]: DrawCardRule,
    [RuleId.SecondChance]: SecondChanceRule,
    [RuleId.PlaceCard]: PlaceCardRule,
    [RuleId.PlayEffect]: PlayEffectRule,
    [RuleId.PlayStrengthToken]: PlayStrengthTokenRule,
    [RuleId.BattleResolution]: BattleResolutionRule,
    [RuleId.PostBattleEffect]: PostBattleEffectRule,
    [RuleId.AllegianceScore]: AllegianceScoreRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
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
