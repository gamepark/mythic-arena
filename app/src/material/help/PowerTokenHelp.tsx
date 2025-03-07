import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PowerTokenHelp: FC<MaterialHelpProps> = () => {
  const { t} = useTranslation()
  return (
    <>
      <h2>
        {t('power')}
      </h2>
      <p>
        {t('power.help')}
      </p>
    </>
  )
}
