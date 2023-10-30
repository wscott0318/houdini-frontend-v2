import React from 'react'
import { useTranslation } from 'react-i18next'

interface TranslatedContentProps {
  contentKeys: {
    text: string | Array<string | JSX.Element>
    indent?: boolean
    title?: boolean
  }[]
}

export const TranslatedContent: React.FC<TranslatedContentProps> = ({
  contentKeys,
}) => {
  const { t } = useTranslation()

  return (
    <div>
      {contentKeys.map((element, index) => {
        return (
          <div
            className={`${element.indent ? 'ml-5' : 'ml-0'} ${
              element.title
                ? 'text-2xl opacity-100 leading-6 font-medium mt-5'
                : 'mt-4 leading-normal text-base opacity-50 font-normal'
            } mt-0 no-underline`}
            key={index}
          >
            {Array.isArray(element.text)
              ? element.text.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {typeof item === 'string' ? t(item) : item}
                  </span>
                ))
              : t(element.text)}
          </div>
        )
      })}
    </div>
  )
}

export default TranslatedContent
