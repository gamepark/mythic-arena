import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const MajorityTokenHelp: FC<MaterialHelpProps> = () => {
  const { t} = useTranslation()
  return (
    <>
      <h2>
        {t('majority')}
      </h2>
      <p>
        {t('majority.help')}
      </p>
    </>
  )
}
