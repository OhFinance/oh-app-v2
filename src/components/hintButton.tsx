type Props = { hint?: string };

export function HintButton({ hint }: Props) {
  return (
    <button
      className={`rounded-full text-xl font-bold h-6 w-6 flex items-center justify-center bg-pink-800 bg-opacity-50 hover:bg-pink-400`}
      title={hint}
    >
      ?
    </button>
  );
}
