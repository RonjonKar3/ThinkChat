'use client';
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import PromptBox from "../components/PromptBox";
import Sidebar from "../components/Sidebar";
import Message from "../components/Message";


export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setexpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => setExpand(!expand)}
              className="rotate-180 cursor-pointer"
              src={assets.menu_icon}
              alt="Menu Icon"
              width={24}
              height={24}
            />
            <Image
              className="opacity-70"
              src={assets.chat_icon}
              alt="Chat Icon"
              width={24}
              height={24}
            />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={assets.logo_icon}
                  alt="ThinkChat Logo"
                  width={64}
                  height={64}
                  className="h-10 w-10"
                />
                <p className="text-2xl font-medium">Hey, I'm ThinkChat.</p>
              </div>
              <p className="text-sm mt-5 font-medium">How can I assist you today?</p>
            </>
          ) : (
            <div>
              <Message role='user' content='what is next js'/>
            </div>
          )}
          <PromptBox isLoading={isLoading} setLoading={setLoading}/>
          <p className="text-xs absolute bottom-1 text-gray-500">AI generated, for reference only</p>
        </div>
      </div>
    </div>
  );
}
