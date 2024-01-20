'use client'

import { useMutation } from '@apollo/client'
import { AnimatePresence, motion } from 'framer-motion'
import { HoudiniButton, Portal, TextField } from 'houdini-react-sdk'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import CustomFileInput from '@/components/CustomFileInput'
import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { ResponsivePage } from '@/components/ResponsivePage'
import { TranslatedContent } from '@/components/TranslatedContent'
import { userClientUpload } from '@/lib/apollo/apollo-client'
import { SEND_BUG_MUTATION } from '@/lib/apollo/query'
import { showErrorMessage } from '@/utils/helpers'

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

export default function BugBountyProgram() {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)

  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [twitter, setTwitter] = useState('')
  const [description, setDescription] = useState('')
  const [fileNames, setFileNames] = useState([])
  const [files, setFiles] = useState([])

  const [sendBug, { loading, error, data }] = useMutation(SEND_BUG_MUTATION, {
    client: userClientUpload,
  })

  const validateFiles = (values: any) => {
    const errors: {
      email?: string
      socialMedia?: string
      description?: string
      files?: string
    } = {}

    if (!values.email) {
      errors.email = t('emailReq')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t('invalidEmail')
    }

    if (!values.telegram && !values.discord && !values.twitter) {
      errors.socialMedia = t('atLeastError')
    }

    if (!values.description) {
      errors.description = t('descReq')
    }

    if (!values.files) {
      errors.files = t('filesReq')
    }

    if (Object.keys(errors).length > 0) {
      return errors
    }

    return null
  }

  const handleSubmit = async (
    email: string,
    telegram: string,
    discord: string,
    twitter: string,
    description: string,
    files: any,
  ) => {
    try {
      const errors = validateFiles({
        email,
        telegram,
        discord,
        twitter,
        description,
        files,
      })

      if (errors?.email) {
        toast.error(errors.email)
      }
      if (errors?.socialMedia) {
        toast.error(errors.socialMedia)
      }
      if (errors?.description) {
        toast.error(errors.description)
      }
      if (errors?.files) {
        toast.error(errors.files)
      }

      console.log('errors', errors)
      if (errors) {
        return
      }

      await sendBug({
        variables: {
          email,
          telegram,
          discord,
          twitter,
          description,
          files,
        },
        onError: (err: any) => {
          console.log('err', err)
          showErrorMessage(err, t)
        },
        onCompleted: () => {
          setEmail('')
          setTelegram('')
          setDiscord('')
          setTwitter('')
          setDescription('')
          setFileNames([])
          setFiles([])
          setModalOpen(false)
          toast.success(t('bugSubmitted'))
        },
      })
    } catch (err) {
      console.log('err', err)
      toast.error(t('somethingWentWrong'))
    }
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const animation = {
    hidden: {
      y: '100%',
      transition: { duration: 0.3 },
    },
    visible: {
      y: '0',
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <ResponsivePage>
        <h1 className="text-3xl leading-12 font-semibold mx-auto text-center">
          {t('houdiniLLC')}
        </h1>
        <h1 className="text-3xl leading-12 mx-auto text-center">
          {t('houdiniBugBountyHeader')}
        </h1>

        <TranslatedContent contentKeys={bugBountyKeys} />
        <HoudiniButton
          text={t('submitReportText')}
          onClick={() => {
            setModalOpen(true)
          }}
          type={'secondary'}
          disabled={false}
        />
      </ResponsivePage>
      <AnimatePresence>
        {modalOpen ? (
          <Portal>
            <motion.div
              className="z-10 fixed left-0 top-0 w-screen h-screen"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              exit="hidden"
              animate="visible"
              variants={animation}
            >
              <div
                onClick={(e) => {
                  e.preventDefault()
                  const target = e.target as HTMLElement
                  if (target.id === 'dropdownClickable') {
                    handleClose()
                  }
                }}
                className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
              >
                <div
                  id="dropdownClickable"
                  className="flex relative min-h-full items-end justify-center sm:items-center p-6 md:p-0"
                >
                  <GeneralModal>
                    <IndustrialCounterLockup>
                      <div className="flex flex-col justify-center w-full items-center gap-2">
                        <div className="text-[28px] whitespace-nowrap sm:text-[34px] font-bold leading-[38px] text-white">
                          Send Bug Form
                        </div>
                        <div className="flex flex-row md:flex-nowrap flex-wrap w-full min-h-[100px] gap-2 h-full justify-center items-center sm:items-start">
                          <div className="w-full md:w-1/2">
                            <TextField
                              id="email"
                              label={'Email'}
                              placeholder="Enter email here."
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <TextField
                              id="telegram"
                              label={'Telegram'}
                              placeholder="Enter telegram here."
                              onChange={(e) => setTelegram(e.target.value)}
                              value={telegram}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-nowrap flex-wrap w-full min-h-[100px] gap-2 h-full justify-center items-center sm:items-start">
                          <div className="w-full md:w-1/2">
                            <TextField
                              id="discord"
                              label={'Discord'}
                              placeholder="Enter discord here."
                              onChange={(e) => setDiscord(e.target.value)}
                              value={discord}
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <TextField
                              id="twitter"
                              label={'Twitter'}
                              placeholder="Enter twitter here."
                              onChange={(e) => setTwitter(e.target.value)}
                              value={twitter}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-nowrap flex-wrap w-full min-h-[100px] gap-2 h-full justify-center items-center sm:items-start">
                          <div className="w-full md:w-1/2">
                            <TextField
                              id="description"
                              label={'Description'}
                              placeholder="Describe the issue."
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <CustomFileInput
                              fileNames={fileNames}
                              setFileNames={setFileNames}
                              setFiles={setFiles}
                            />
                          </div>
                        </div>
                        <HoudiniButton
                          text={'Send'}
                          onClick={() =>
                            handleSubmit(
                              email,
                              telegram,
                              discord,
                              twitter,
                              description,
                              files,
                            )
                          }
                          type={'secondary'}
                          disabled={false}
                        />
                      </div>
                    </IndustrialCounterLockup>
                  </GeneralModal>
                </div>
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  )
}
