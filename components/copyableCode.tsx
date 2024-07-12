"use client"
/** code show & copy 기능 */
import React, { useState } from 'react';
import { CopyableCodeProps } from '@/utils/types';

const CopyableCode: React.FC<CopyableCodeProps> = ({ code }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="max-w-[1200px] max-h-[600px] relative bg-gray-800 rounded-lg overflow-scroll ">
        <pre className=" p-4 text-sm text-white overflow-x-auto  ">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {copyStatus === 'idle' && 'Copy'}
          {copyStatus === 'copied' && 'Copied!'}
          {copyStatus === 'error' && 'Error!'}
        </button>
      </div>
    </div>
  );
};

export default CopyableCode;