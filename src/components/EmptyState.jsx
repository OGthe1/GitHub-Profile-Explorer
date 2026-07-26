import { GitBranch, Search } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 animate-[fadeSlideUp_0.5s_ease-out]">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center animate-float">
          <Search className="w-8 h-8 text-indigo-300" />
        </div>
        <GitBranch className="w-24 h-24 text-zinc-200" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-zinc-700">
        Explore GitHub Profiles
      </h3>
      <p className="mt-2 text-zinc-400 text-center max-w-md">
        Search for any GitHub username to discover their profile, repositories, and stats.
      </p>
    </div>
  );
}