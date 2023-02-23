import React from 'react';

import { Icon } from '@iconify/react';

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="flex flex-col justify-center items-center"
      onClick={onClick}
    >
      <Icon className="text-2xl" icon="radix-icons:cross-2" />
      <span className="uppercase text-xs">Close</span>
    </button>
  );
}
