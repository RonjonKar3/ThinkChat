import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <form className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
      <textarea
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
        rows={2} // ✅ corrected from row to rows
        placeholder='Message ThinkChat'
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
            <Image src={assets.deepthink_icon} alt='' width={20} height={20} /> {/* ✅ Set size */}
            DeepThink (R1)
          </p>
          <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
            <Image src={assets.search_icon} alt='' width={20} height={20} /> {/* ✅ Set size */}
            Search
          </p>
        </div>
        <div className='flex items-center gap-2'>
  <Image
    src={assets.pin_icon}
    alt=''
    width={25}
    height={25}
    className='cursor-pointer'
  />
  <button
    className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full w-9 h-9 flex items-center justify-center cursor-pointer`} // ⬅️ Ensures round shape & centering
  >
    <Image
      src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
      alt=''
      width={17}
      height={17}
    />
  </button>
</div>

      </div>
    </form>
  )
}

export default PromptBox;
