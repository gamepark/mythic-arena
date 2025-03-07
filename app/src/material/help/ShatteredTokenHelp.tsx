import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const ShatteredTokenHelp: FC<MaterialHelpProps> = () => {
  const { t} = useTranslation()
  return (
    <>
      <h2>
        {t('shattered')}
      </h2>
      <p>
        {t('shattered.help')}
      </p>
    </>
  )
}
