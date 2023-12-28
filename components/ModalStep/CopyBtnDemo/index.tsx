import { CopySvg } from '@/components/Svg'

interface ClipboardProps {
  textColor?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  textOpacity?: string
  concept: string
}

export const CopyBtnDemo = (props: ClipboardProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.concept)
  }
  return (
    <div className="flex flex-row gap-[10px]">
      <div
        className={`${props.textColor} ${props.fontSize} ${props.fontWeight} ${props.lineHeight} ${props.textOpacity} text-center`}
      >
        {props.concept}
      </div>
      <button onClick={copyToClipboard}>
        <CopySvg className="w-[15px] h-[15px]" />
      </button>
    </div>
  )
}
