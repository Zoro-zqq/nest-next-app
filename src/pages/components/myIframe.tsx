interface Props {
  src: string
  title: string
}

export default function LinkWeb({ src, title }: Props) {
  return (
    <>
      <div
        style={{
          backgroundColor: '#272728',
          height: '28px'
        }}
        className='w-full'
      ></div>
      <iframe className='w-full h-full' src={src} title={title} />
    </>
  )
}
