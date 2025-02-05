/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { ComponentType } from 'react'
import { TheFirstStepHeader } from './TheFirstStepHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawCard]: TheFirstStepHeader
}
