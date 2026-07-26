import { SearchX } from 'lucide-react';

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 animate-[fadeSlideUp_0.5s_ease-out]">
      <div className="relative">
        <SearchX className="w-20 h-20 text-zinc-300 animate-drift" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-zinc-700">
        Oops! We couldn't find that explorer.
      </h3>
      <p className="mt-2 text-zinc-400 text-center max-w-md">
        {message || "Double-check the spelling and try again."}
      </p>
    </div>
  );
}