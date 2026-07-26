import { Star, GitFork } from 'lucide-react';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Scala: '#c22d40',
  Lua: '#000080',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Erlang: '#B83998',
  R: '#198CE7',
  Objective_C: '#438eff',
  Groovy: '#e69f56',
  Perl: '#0298c3',
  Julia: '#a270ba',
  Elm: '#60B5CC',
  Nix: '#7e7eff',
  Zig: '#ec915c',
  Nim: '#37775b',
  Crystal: '#000100',
  Assembly: '#6E4C13',
  TeX: '#3D6117',
};

function RepoCard({ repo }) {
  const langColor = LANGUAGE_COLORS[repo.language] || '#858585';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-white rounded-xl border border-zinc-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 group"
    >
      <h3 className="font-semibold text-zinc-800 group-hover:text-indigo-600 transition-colors duration-200 truncate">
        {repo.name}
      </h3>
      {repo.description && (
        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 mt-4 text-xs text-zinc-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" />
          {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

export default function RepoGrid({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <h3 className="text-lg font-semibold text-zinc-700 mb-4">
        Top Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}