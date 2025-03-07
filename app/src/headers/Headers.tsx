/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { ComponentType } from 'react'
import { AllegianceScoreHeader } from './AllegianceScoreHeader'
import { BattleResolutionHeader } from './BattleResolutionHeader'
import { CaptureHeader } from './CaptureHeader'
import { HelaHadesHeader } from './HelaHadesHeader'
import { HeraclesSiegfriedHeader } from './HeraclesSiegfriedHeader'
import { PlaceHeader } from './PlaceHeader'
import { PlayStrengthTokenHeader } from './PlayStrengthTokenHeader'
import { DrawHeader } from './DrawHeader'
import { PostBattleEffectHeader } from './PostBattleEffectHeader'
import { TakeStrengthTokenHeader } from './TakeStrengthTokenHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawCard]: DrawHeader,
  [RuleId.PlaceCard]: PlaceHeader,
  [RuleId.TakeStrengthToken]: TakeStrengthTokenHeader,
  [RuleId.PlayStrengthToken]: PlayStrengthTokenHeader,
  [RuleId.BattleResolution]: BattleResolutionHeader,
  [RuleId.PostBattleEffect]: PostBattleEffectHeader,
  [RuleId.AllegianceScore]: AllegianceScoreHeader,
  [RuleId.HelaHades]: HelaHadesHeader,
  [RuleId.HeraclesSiegfried]: HeraclesSiegfriedHeader,
  [RuleId.CaptureCard]: CaptureHeader,

}
