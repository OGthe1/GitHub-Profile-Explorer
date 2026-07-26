import { BookOpen, Users, Star } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

function StatCard({ icon: Icon, label, target, color }) {
  const count = useAnimatedCounter(target);

  return (
    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-zinc-100 shadow-sm min-w-[130px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-2xl font-bold text-zinc-800 tabular-nums">
        {count.toLocaleString()}
      </span>
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection({ publicRepos, followers, totalStars }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <StatCard icon={BookOpen} label="Repos" target={publicRepos} color="text-emerald-500" />
      <StatCard icon={Users} label="Followers" target={followers} color="text-indigo-500" />
      <StatCard icon={Star} label="Stars" target={totalStars} color="text-amber-500" />
    </div>
  );
}