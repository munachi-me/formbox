import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/formbox.jpg"
        alt="formbox logo"
        width={23}
        height={23} 
      />
      <span className="text-white font-semibold text-xl">FormBox</span>
    </div>  
  )
}