import { MapPin, Link as LinkIcon, Calendar, Users, UserPlus } from 'lucide-react';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 transition-all duration-500 ease-out">
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 animate-[fadeSlideUp_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="w-28 h-28 rounded-full ring-4 ring-indigo-100 shadow-md"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-zinc-900">{user.name || user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors duration-200"
            >
              @{user.login}
            </a>

            {user.bio && (
              <p className="text-zinc-500 leading-relaxed max-w-lg line-clamp-3">
                {user.bio}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-zinc-400 justify-center sm:justify-start">
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.location}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors duration-200"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  {user.blog.replace(/^https?:\/\//, '').slice(0, 25)}
                </a>
              )}
              {user.created_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {formatDate(user.created_at)}
                </span>
              )}
            </div>

            {/* Followers row */}
            <div className="flex items-center gap-5 pt-2 text-sm justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-zinc-700">{user.followers}</span>
                <span>followers</span>
              </span>
              <span className="flex items-center gap-1.5 text-zinc-500">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-zinc-700">{user.following}</span>
                <span>following</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}