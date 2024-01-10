import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const CustomFileInput = ({
  fileNames,
  setFileNames,
  setFiles,
}: {
  fileNames: any
  setFileNames: any
  setFiles: any
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const handleButtonClick = () => {
    ;(
      fileInputRef as React.MutableRefObject<HTMLInputElement>
    )?.current.click?.()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    console.log('intru aici??')
    const files = Array.from(event.target.files as FileList)
    const validImageTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ]
    const invalidFiles = files.filter(
      (file: File) => !validImageTypes.includes(file.type),
    )

    if (invalidFiles.length > 0) {
      toast.error(t('pleaseSelectOnlyImg'))
    } else {
      const fileNames = files.map((file: File) => file.name)
      setFileNames(fileNames)
      setFiles(files)
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/pdf,image/jpeg,image/jpg,image/png"
        multiple
        onInput={handleFileChange}
      />
      <button onClick={handleButtonClick}>{t('attachFiles')}</button>

      <div className="text-white">
        {fileNames.length > 0 &&
          fileNames.map((fileName: any) => {
            return <div key={fileName}>{fileName}</div>
          })}
      </div>
    </div>
  )
}

export default CustomFileInput
