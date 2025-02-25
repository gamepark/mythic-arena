import { getEnumValues } from '@gamepark/rules-api'

export enum PantheonType {
  Greek = 1,
  Norse
}

export const pantheons = getEnumValues(PantheonType);
