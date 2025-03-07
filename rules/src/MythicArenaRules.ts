import { CompetitiveRank, hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PantheonType } from './material/PantheonType'
import { AllegianceScoreRule } from './rules/AllegianceScoreRule'
import { BattleResolutionRule } from './rules/BattleResolutionRule'
import { CaptureCardRule } from './rules/CaptureCardRule'
import { DrawCardRule } from './rules/DrawCardRule'
import { EndGameRule } from './rules/EndGameRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { HelaHadesRule } from './rules/HelaHadesRule'
import { PlaceCardRule } from './rules/PlaceCardRule'
import { PlayEffectRule } from './rules/PlayEffectRule'
import { PlayStrengthTokenRule } from './rules/PlayStrengthTokenRule'
import { PostBattleEffectRule } from './rules/PostBattleEffectRule'
import { RuleId } from './rules/RuleId'
import { TakeDiscardCardRule } from './rules/TakeDiscardCardRule'
import { TakeStrengthTokenRule } from './rules/TakeStrengthTokenRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class MythicArenaRules extends SecretMaterialRules<PantheonType, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<PantheonType, MaterialType, LocationType>, MaterialMove<PantheonType, MaterialType, LocationType>, PantheonType>,
    TimeLimit<MaterialGame<PantheonType, MaterialType, LocationType>, MaterialMove<PantheonType, MaterialType, LocationType>, PantheonType> {
  rules = {
    [RuleId.DrawCard]: DrawCardRule,
    [RuleId.PlaceCard]: PlaceCardRule,
    [RuleId.PlayEffect]: PlayEffectRule,
    [RuleId.TakeStrengthToken]: TakeStrengthTokenRule,
    [RuleId.PlayStrengthToken]: PlayStrengthTokenRule,
    [RuleId.BattleResolution]: BattleResolutionRule,
    [RuleId.PostBattleEffect]: PostBattleEffectRule,
    [RuleId.AllegianceScore]: AllegianceScoreRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.HeraclesSiegfried]: TakeDiscardCardRule,
    [RuleId.CaptureCard]: CaptureCardRule,
    [RuleId.HelaHades]: HelaHadesRule,
    [RuleId.EndGame]: EndGameRule
  }

  locationsStrategies = {
    [MaterialType.PantheonCard]: {
      [LocationType.PantheonDeck]: new PositiveSequenceStrategy(),
      [LocationType.PantheonDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.Power]: {
      [LocationType.PantheonCardPower]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.PantheonCard]: {
      [LocationType.PantheonDeck]: hideFront
    }
  }

  rankPlayers(playerA: PantheonType, playerB: PantheonType) {
    const playerAGlory = this.getPlayerGlory(playerA)
    const playerBGlory = this.getPlayerGlory(playerB)
    if (playerAGlory > playerBGlory) return -1
    if (playerBGlory > playerAGlory) return 1

    const playerAStrength = this.getPlayerStrength(playerA)
    const playerBStrength = this.getPlayerStrength(playerB)
    if (playerAStrength > playerBStrength) return -1
    if (playerBStrength > playerAStrength) return 1
    return 0
  }

  getPlayerGlory(pantheon: PantheonType) {
    const hasMajority = this.material(MaterialType.MajorityGloryPoint).location(LocationType.PlayerMajorityGlory).player(pantheon).length > 0
    return this.material(MaterialType.GloryPoint).player(pantheon).getQuantity() + (hasMajority? 3: 0)
  }

  getPlayerStrength(pantheon: PantheonType) {
    return this.material(MaterialType.Power)
        .location(LocationType.PlayerPower)
        .player(pantheon)
        .getQuantity()
      + this.material(MaterialType.ShatteredShield)
        .location(LocationType.PlayerShatteredShield)
        .player(pantheon)
        .getQuantity()
  }


  giveTime(): number {
    return 60
  }
}
