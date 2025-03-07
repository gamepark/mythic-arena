import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const GloryTokenHelp: FC<MaterialHelpProps> = () => {
  const { t} = useTranslation()
  return (
    <>
      <h2>
        {t('glory')}
      </h2>
      <p>
        {t('glory.help')}
      </p>
    </>
  )
}
