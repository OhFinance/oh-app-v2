import React from 'react';

export default function Option({
  active,
  onClick = null,
  icon,
  id,
  label,
}: {
  onClick?: null | (() => void);
  label: string;
  icon: string;
  id: string;
  active?: boolean;
}) {
  return (
    <div
      id={id}
      onClick={onClick || undefined}
      className={`border-2 border-transparent w-full mb-2 cursor-pointer bg-inputBG hover:border-consoleBorderAccent ${
        active ? 'border-consoleBorderAccent' : ''
      } rounded-lg`}
    >
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="w-8  h-8 flex justify-center items-center">
          <img alt={label} src={icon}></img>
        </div>
        <h5 className="text-lg font-medium text-defaultText">{label}</h5>
      </div>
    </div>
  );
}
