import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { MessageSquare, Send, ThumbsUp, Plus, User2, MessageCircle } from 'lucide-react';

export default function StudentForum() {
  const { profile } = useProfile();
  const [posts, setPosts] = useState(uetDB.forumPosts);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(uetDB.courses[0]?.id || 'course-se');

  // Reply states
  const [replyPostId, setReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (!profile) return null;

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost = uetDB.addForumPost(
      profile.id,
      profile.name,
      selectedCourse,
      uetDB.courses.find(c => c.id === selectedCourse)?.name || 'DCSE Class Discussion',
      newTitle,
      newContent
    );

    if (newPost) {
      setPosts([newPost, ...posts]);
      setNewTitle('');
      setNewContent('');
      setShowAddForm(false);
    }
  };

  const handleAddReply = (postId: string) => {
    if (!replyText) return;
    const isReplyAdded = uetDB.addForumReply(postId, profile.name, replyText);
    if (isReplyAdded) {
      setPosts([...uetDB.forumPosts]);
      setReplyText('');
      setReplyPostId(null);
    }
  };

  return (
    <div className="space-y-6" id="student-forum-boards">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Undergraduate Forum Boards</h2>
          <p className="text-xs text-slate-400">Ask coding queries, search assignment hacks, or join active group studies.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all text-center shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>{showAddForm ? 'Hide panel' : 'Create Thread'}</span>
        </button>
      </div>

      {/* Creation form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
            Create Discussion Thread
          </h3>

          <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Assigned Subject Channel</label>
              <select
                required
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
              >
                {uetDB.courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Thread Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Help needed with assembly traffic simulator program"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Thread Body / Question</label>
              <textarea
                required
                rows={4}
                placeholder="Explicate your query or study proposal..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[rgb(var(--university-primary))] text-white font-bold rounded-lg cursor-pointer transition-all active:scale-98"
            >
              Post thread to Channels
            </button>
          </form>
        </div>
      )}

      {/* Threads list */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <EmptyState 
            title="Channel Boards Silent" 
            description="Use 'Create Thread' above to launch the first academic conversation board topic!" 
          />
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-xs space-y-4"
              id={`post-panel-${post.id}`}
            >
              {/* Thread header */}
              <div className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-slate-850">
                <div className="flex justify-between items-center text-[10px] uppercase font-black text-slate-400">
                  <span className="text-[9px] px-2 py-0.5 bg-yellow-500/10 text-yellow-600 rounded border border-yellow-500/10 leading-none">
                    {post.course_name}
                  </span>
                  <span>{new Date(post.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-850 dark:text-white leading-tight">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-450 font-bold">
                  <User2 className="w-3.5 h-3.5" />
                  <span>Posted by: {post.author_name}</span>
                </div>
              </div>

              {/* Thread content body */}
              <p className="text-xs text-slate-702 dark:text-slate-350 leading-relaxed font-medium pl-1">
                {post.content}
              </p>

              {/* Replied lists */}
              {post.replies && post.replies.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl space-y-3 border border-slate-100 dark:border-slate-850">
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Academic Replies</span>
                  <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-850/60 font-medium">
                    {post.replies.map((rep, rIdx) => (
                      <div key={rIdx} className={`text-xs pt-2 ${rIdx === 0 ? 'pt-0' : ''}`}>
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1 leading-none">
                          <span className="text-slate-855 dark:text-slate-300 font-extrabold">{rep.author_name}</span>
                          <span>{new Date(rep.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-tight">{rep.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Post interactive action buttons */}
              <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 dark:border-slate-850 mt-4 text-xs font-bold text-slate-450 select-none">
                <button
                  onClick={() => setReplyPostId(replyPostId === post.id ? null : post.id)}
                  className="flex items-center space-x-1 hover:text-[rgb(var(--university-primary))] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-[rgb(var(--university-primary))]" />
                  <span>Reply</span>
                </button>
              </div>

              {/* Interactive inline reply box */}
              {replyPostId === post.id && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Write a helpful answer reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}
