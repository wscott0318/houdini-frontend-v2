'use client'

import { useMutation } from '@apollo/client'
import { HoudiniButton, TextField } from 'houdini-react-sdk'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { ResponsivePage } from '@/components/ResponsivePage'
import { SEND_CONTACT_FORM } from '@/lib/apollo/query'
import { showErrorMessage } from '@/utils/helpers'

export default function GetApiAccess() {
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [twitter, setTwitter] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [referral, setReferral] = useState('')
  const [token, setToken] = useState('')
  const [tokenChain, setTokenChain] = useState('')

  const [sendContact, { loading, error, data }] = useMutation(SEND_CONTACT_FORM)

  const validateFields = (values: any) => {
    const errors: {
      email?: string
      socialMedia?: string
      description?: string
      website?: string
      referral?: string
      token?: string
      tokenChain?: string
    } = {}

    if (!values.email) {
      errors.email = t('emailReq')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t('invalidEmail')
    }
    if (!values.website) {
      errors.referral = t('websiteReq')
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
    website: string,
    description: string,
    referral: string,
    token: string,
    tokenChain: string,
  ) => {
    try {
      const errors = validateFields({
        email,
        telegram,
        discord,
        twitter,
        website,
        description,
        referral,
        token,
        tokenChain,
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
      if (errors?.website) {
        toast.error(errors.website)
      }
      if (errors?.referral) {
        toast.error(errors.referral)
      }
      if (errors?.token) {
        toast.error(errors.token)
      }

      if (errors) {
        return
      }

      await sendContact({
        variables: {
          email,
          telegram,
          discord,
          twitter,
          website,
          description,
          referral,
          token,
          tokenChain,
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
          setWebsite('')
          setReferral('')
          setToken('')
          setTokenChain('')
          setDescription('')
          toast.success(t('reqSubmitted'))
        },
      })
    } catch (err) {
      console.log('err', err)
      toast.error(t('somethingWentWrong'))
    }
  }

  return (
    <ResponsivePage>
      <GeneralModal>
        <IndustrialCounterLockup>
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <div className="flex flex-col justify-center items-center sm:items-start gap-[16px]">
              <div className="text-[28px] whitespace-nowrap sm:text-[34px] font-bold leading-[38px] text-white">
                Request Integration Access
              </div>
              <div className="text-[15px] font-medium font-poppins rainbow-text">
                Thank you for your interest in Houdini Swap. Please complete the form below so we may follow up with you shortly.
              </div>
            </div>
            <div className="flex flex-row md:flex-nowrap flex-wrap w-full min-h-[100px] gap-2 h-full justify-center items-center sm:items-start">
              <div className="w-full md:w-1/2">
                <TextField
                  id="website"
                  label={'Website'}
                  placeholder="Enter website here."
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
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
                  placeholder="Brief description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="w-full md:w-1/2">
                <TextField
                  id="email"
                  type='email'
                  label="Your Email"
                  placeholder="Enter email here."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="flex flex-row md:flex-nowrap flex-wrap w-full min-h-[100px] gap-2 h-full justify-center items-center sm:items-start">
              <div className="w-full md:w-1/2">
                <TextField
                  id="token"
                  label={'Token'}
                  placeholder="e.g ETH, USDT, etc."
                  onChange={(e) => setToken(e.target.value)}
                  value={token}
                />
              </div>
              <div className="w-full md:w-1/2">
                <TextField
                  id="tokenChain"
                  label={'Token Chain'}
                  placeholder="e.g Ethereum Mainnet"
                  onChange={(e) => setTokenChain(e.target.value)}
                  value={tokenChain}
                />
              </div>
            </div>
            <HoudiniButton
              text={'Send'}
              onClick={() => {
                handleSubmit(
                  email,
                  telegram,
                  discord,
                  twitter,
                  website,
                  description,
                  referral,
                  token,
                  tokenChain,
                )
              }}
              type={'secondary'}
              disabled={false}
            />
          </div>
        </IndustrialCounterLockup>
      </GeneralModal>
    </ResponsivePage>
  )
}
