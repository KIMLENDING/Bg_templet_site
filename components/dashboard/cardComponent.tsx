import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { CardComponentProps } from '@/utils/types';


const CardComponent: React.FC<CardComponentProps> = ({ data, setBg, setCode }) => {
    return (
        <Card className="group relative overflow-hidden hover:scale-105 transition-all duration-300 h-60">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{data.title}</p>
                <h4 className="text-white font-medium text-large">{data.subtitle}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt={data.title}
                className="z-0 w-full h-full object-cover"
                src={data.imageSrc}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button
                    onClick={() => { setBg(data.selectBg); setCode(data.codeData) }} // 수정
                    radius="full"
                    size="sm"
                    className="mt-2"
                >
                    Show More
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CardComponent;
