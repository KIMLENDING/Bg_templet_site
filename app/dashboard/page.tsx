"use client"
import React, { useState } from 'react'
import CombinedBackgrounds from "@/components/combined-backgrounds";
import CardComponent from "@/components/dashboard/cardComponent";
import CopyableCode from '@/components/copyableCode';
import { CardData } from '@/utils/types';
import { cardData } from '@/utils/data';

const Page: React.FC = () => {
    const [bg, setBg] = useState("wave");
    const [code, setCode] = useState(cardData.find(card => card.selectBg === 'wave')?.codeData);
    const [showCode, setShowCode] = useState(true);

    return (
        <div className="container mx-auto px-4">
            <div className='flex flex-col gap-8'>
                {showCode ?
                    <CombinedBackgrounds bg={bg} /> : <CopyableCode code={code} />}
                <div className="flex justify-center items-center">
                    <button className="bg-primary-500 text-white px-4 py-2 rounded-md" onClick={() => setShowCode(!showCode)}>
                        {showCode ? 'Show' : 'Hide'} Code
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cardData.map((card: CardData) => (
                        <CardComponent key={card.id} data={card} setBg={setBg} setCode={setCode} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page;
