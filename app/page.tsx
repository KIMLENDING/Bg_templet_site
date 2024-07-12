'use client';
import NeonRaysBackground from '@/components/bg_templet/neon-rays-background';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function Home() {


  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <div>
        <NeonRaysBackground width={1200} height={600} />
      </div>
      <Button><Link href="/dashboard">Go To Dashboard</Link></Button>
    </div>
  );
}
