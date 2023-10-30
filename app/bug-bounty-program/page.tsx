'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { TranslatedContent } from '@/components/TranslatedContent'
import { useTranslation } from 'react-i18next'

export default function BugBountyProgram() {
  const { t } = useTranslation()

  const bugBountyKeys = [
    {
      text: 'bugBountyP1',
      indent: false,
      title: false,
    },
    {
      text: [
        'bugBountyP2',
        <a
          key="gitbook-link"
          target="_blank"
          href="https://houdini-swap.gitbook.io/product-docs/"
        >
          {''} Gitbook
        </a>,
      ],
      indent: false,
      title: true,
    },

    {
      text: 'bugBountyP3',
      indent: false,
      title: false,
    },
    {
      text: 'bugBountyP4',
      indent: false,
      title: false,
    },
    {
      text: 'bugBountyP5',
      indent: false,
      title: true,
    },
    {
      text: 'bugBountyP6',
      indent: false,
      title: false,
    },
    {
      text: 'bugBountyP7',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP8',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP9',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP10',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP11',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP12',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP13',
      indent: false,
      title: true,
    },
    {
      text: 'bugBountyP14',
      indent: false,
      title: false,
    },
    {
      text: 'bugBountyP15',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP16',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP17',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP18',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP19',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP20',
      indent: false,
      title: true,
    },
    {
      text: 'bugBountyP21',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP22',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP23',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP24',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP25',
      indent: true,
      title: false,
    },
    {
      text: 'bugBountyP26',
      indent: false,
      title: false,
    },
  ]

  return (
    <ResponsivePage>
      <h1 className="text-3xl leading-12 font-semibold mx-auto text-center">
        {t('houdiniLLC')}
      </h1>
      <h1 className="text-3xl leading-12 mx-auto text-center">
        {t('houdiniBugBountyHeader')}
      </h1>

      <TranslatedContent contentKeys={bugBountyKeys} />
      <button
        className="w-48 h-12 rounded-full bg-white border border-white text-black font-semibold text-lg cursor-pointer flex items-center justify-center hover:bg-black hover:text-white transition duration-300 ease-in-out"
        onClick={() => {
          // setModalOpen(true);
        }}
      >
        {t('submitReportText')}
      </button>
    </ResponsivePage>
  )
}
