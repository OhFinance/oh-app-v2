export function HintButton({ hint }: { hint?: string }) {
  return (
    <button
      className={`rounded-full text-2xl font-bold h-8 w-8 flex items-center justify-center bg-pink-800 bg-opacity-50 hover:bg-pink-400`}
      title={hint}
    >
      ?
    </button>
  );
}
