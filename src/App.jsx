import { useState, useCallback } from 'react';
import { GitBranch } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StatsSection from './components/StatsSection';
import RepoGrid from './components/RepoGrid';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { ProfileSkeleton, StatsSkeleton, ReposGridSkeleton } from './components/SkeletonLoader';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchUserData = useCallback(async (username) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setSearched(true);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
        fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`),
      ]);

      if (userRes.status === 404) {
        setError('User not found');
        setLoading(false);
        return;
      }

      if (!userRes.ok) {
        throw new Error(`GitHub API error: ${userRes.status}`);
      }

      const userData = await userRes.json();
      const reposData = reposRes.ok ? await reposRes.json() : [];

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GitBranch className="w-8 h-8 text-zinc-800" />
            <h1 className="text-3xl font-bold text-zinc-800">
              GitHub Profile Explorer
            </h1>
          </div>
          <p className="text-zinc-400 mb-8">
            Discover developers, their repos, and contributions
          </p>
          <SearchBar onSelectUser={fetchUserData} />
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="animate-[fadeSlideUp_0.3s_ease-out]">
              <ProfileSkeleton />
              <StatsSkeleton />
              <ReposGridSkeleton />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <ErrorState message={error} />
          )}

          {/* Empty State */}
          {!loading && !error && !searched && (
            <EmptyState />
          )}

          {/* User Data */}
          {!loading && !error && user && (
            <div className="animate-[fadeSlideUp_0.4s_ease-out]">
              <ProfileCard user={user} />
              <StatsSection
                publicRepos={user.public_repos}
                followers={user.followers}
                totalStars={totalStars}
              />
              <RepoGrid repos={repos} />
            </div>
          )}

          {/* Searched but no results (edge case) */}
          {!loading && !error && searched && !user && (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;