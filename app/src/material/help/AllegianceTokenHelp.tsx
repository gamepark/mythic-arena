import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const AllegianceTokenHelp: FC<MaterialHelpProps> = (props) => {
  const { t} = useTranslation()
  const { item } = props
  return (
    <>
      <h2>
        {t('allegiance')}
      </h2>
      <p>
        {t('allegiance.help', { allegiance: t(`pantheon.${item.id}`)})}
      </p>
    </>
  )
}
