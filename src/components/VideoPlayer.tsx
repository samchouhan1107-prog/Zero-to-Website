import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Clock,
  ListOrdered,
  FileText,
  Code,
  Layers,
  Sparkles,
  ChevronRight,
  Tv,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Mic,
  MicOff,
} from 'lucide-react';
import { LessonVideo, RelatedTopic, Chapter } from '../types';

interface VideoPlayerProps {
  video: LessonVideo;
  currentLessonId?: string;
  relatedTopics?: RelatedTopic[];
  allChapters?: Chapter[];
  onSelectLesson?: (lessonId: string) => void;
  onJumpToPractice?: () => void;
  onJumpToVisualLab?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  currentLessonId,
  relatedTopics = [],
  allChapters = [],
  onSelectLesson,
  onJumpToPractice,
  onJumpToVisualLab,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'timestamps' | 'transcript' | 'related' | 'animation'>('timestamps');
  const [isMuted, setIsMuted] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);

  // Total simulated duration in seconds (defaults to ~300s = 5 mins)
  const totalSeconds = 300;

  // Safe timer interval ref
  const timerRef = useRef<any>(null);

  // 1. Critical Fix: When video changes or unmounts, ALWAYS halt playback, speech synthesis, and reset state!
  useEffect(() => {
    // Stop any speech synthesis immediately
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Clear any ticking interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setTtsActive(false);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [video.title]);

  // 2. Playback interval ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            return totalSeconds;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const seekTo = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  // Active transcript item based on current time
  const activeTranscriptIndex = video.transcript.findIndex(
    (item, i) =>
      currentTime >= item.seconds &&
      (i === video.transcript.length - 1 || currentTime < video.transcript[i + 1].seconds)
  );

  const activeTimestamp = video.timestamps
    .slice()
    .reverse()
    .find((ts) => currentTime >= ts.seconds) || video.timestamps[0];

  // Speech synthesis of active transcript
  const toggleSpeechNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (ttsActive) {
      window.speechSynthesis.cancel();
      setTtsActive(false);
    } else {
      window.speechSynthesis.cancel();
      const currentText = video.transcript[activeTranscriptIndex]?.text || video.description;
      const utterance = new SpeechSynthesisUtterance(currentText);
      utterance.rate = playbackSpeed;
      utterance.onend = () => setTtsActive(false);
      window.speechSynthesis.speak(utterance);
      setTtsActive(true);
    }
  };

  // Find all supportive videos in curriculum
  const allSupportiveVideos = allChapters.flatMap((ch) =>
    ch.lessons.map((l) => ({
      lessonId: l.id,
      lessonTitle: l.title,
      chapterNumber: ch.number,
      video: l.video,
    }))
  );

  return (
    <div
      id="video-lesson-studio"
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md"
    >
      {/* Studio Header Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-600/30 text-white">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                Supportive Masterclass
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  isPlaying
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 animate-pulse'
                    : currentTime > 0
                    ? 'bg-amber-950/80 text-amber-400 border border-amber-700/60'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isPlaying ? '● PLAYING' : currentTime > 0 ? 'PAUSED' : 'STOPPED'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1 line-clamp-1">{video.title}</h3>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {onJumpToPractice && (
            <button
              onClick={onJumpToPractice}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Practice Sandbox</span>
            </button>
          )}

          {onJumpToVisualLab && (
            <button
              onClick={onJumpToVisualLab}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visual Lab</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Main Player Display Stage */}
        <div className="lg:col-span-8 bg-slate-950 flex flex-col justify-between p-6 min-h-[380px] relative overflow-hidden">
          {/* Visual Concept Stage */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 relative z-10">
            {/* Dynamic Concept Simulation Visualizer */}
            <div className="w-full max-w-lg space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xs text-center space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1 text-indigo-400 font-bold">
                    <Sparkles className="w-3 h-3" /> Live Topic: {activeTimestamp?.title}
                  </span>
                  <span className="text-slate-500">{activeTimestamp?.time}</span>
                </div>

                {/* Animated Graphic based on demoAnimationType */}
                <div className="h-28 rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  {video.demoAnimationType === 'packet-route' && (
                    <div className="w-full flex items-center justify-between px-4 text-xs font-mono text-slate-300 relative">
                      <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold text-[11px]">
                        🖥️ Client
                      </div>
                      <div className="flex-1 mx-3 border-t-2 border-dashed border-indigo-500/50 relative">
                        <div
                          className="absolute -top-3 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-md transition-all duration-300"
                          style={{
                            left: `${(currentTime % 10) * 10}%`,
                          }}
                        >
                          📦
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-950 border border-purple-700 text-purple-300 font-bold text-[11px]">
                        ☁️ DNS / Server
                      </div>
                    </div>
                  )}

                  {video.demoAnimationType === 'dom-build' && (
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-1 rounded bg-indigo-900 text-indigo-200 border border-indigo-700 font-bold">
                        &lt;html&gt;
                      </span>
                      <span className="text-slate-600">→</span>
                      <span className="px-2 py-1 rounded bg-purple-900 text-purple-200 border border-purple-700 font-bold">
                        &lt;body&gt;
                      </span>
                      <span className="text-slate-600">→</span>
                      <span className="px-2 py-1 rounded bg-pink-900 text-pink-200 border border-pink-700 font-bold animate-pulse">
                        &lt;h1&gt; / &lt;p&gt;
                      </span>
                    </div>
                  )}

                  {video.demoAnimationType === 'flex-align' && (
                    <div className="w-full h-full p-2 border border-slate-800 rounded-lg flex items-center justify-around bg-slate-900/40">
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-md transition-transform duration-500"
                          style={{
                            transform: `translateY(${Math.sin((currentTime + num) * 0.8) * 8}px)`,
                          }}
                        >
                          Item {num}
                        </div>
                      ))}
                    </div>
                  )}

                  {video.demoAnimationType === 'grid-track' && (
                    <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
                      {[1, 2, 3].map((c) => (
                        <div
                          key={c}
                          className="rounded bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-[10px] font-mono font-bold flex items-center justify-center"
                        >
                          1fr (Col {c})
                        </div>
                      ))}
                    </div>
                  )}

                  {video.demoAnimationType === 'git-branch' && (
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-950" />
                      <span className="w-8 h-0.5 bg-emerald-500" />
                      <span className="w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-950" />
                      <span className="w-8 h-0.5 bg-indigo-500" />
                      <span className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-950 animate-pulse" />
                      <span className="text-[10px] text-purple-400 font-bold">feature/branch</span>
                    </div>
                  )}

                  {!['packet-route', 'dom-build', 'flex-align', 'grid-track', 'git-branch'].includes(
                    video.demoAnimationType
                  ) && (
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>WZ Storehouse Concept Animation Loop</span>
                    </div>
                  )}
                </div>

                {/* Subtitle / Active Transcript Line */}
                {activeTranscriptIndex >= 0 && (
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-indigo-200 font-medium animate-fade-in shadow-inner flex items-center justify-between gap-2">
                    <span className="text-left leading-relaxed">
                      "{video.transcript[activeTranscriptIndex]?.text}"
                    </span>
                    <button
                      onClick={toggleSpeechNarration}
                      className="p-1 rounded text-slate-400 hover:text-indigo-300 shrink-0"
                      title={ttsActive ? 'Stop Narration' : 'Read Out Loud'}
                    >
                      {ttsActive ? <Mic className="w-3.5 h-3.5 text-amber-400" /> : <MicOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video Studio Controls Bar */}
          <div className="relative z-10 pt-4 border-t border-slate-800 space-y-2.5">
            {/* Progress Scrub Bar */}
            <div className="relative group cursor-pointer">
              <input
                type="range"
                min="0"
                max={totalSeconds}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                {/* Play / Pause Toggle */}
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="p-2 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-bold transition-all shadow-md"
                  aria-label={isPlaying ? 'Pause masterclass' : 'Play masterclass'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                {/* Dedicated Stop Button */}
                <button
                  onClick={handleStop}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Stop and Reset"
                  aria-label="Stop video"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>

                {/* Replay */}
                <button
                  onClick={() => seekTo(0)}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Mute toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-slate-300">
                  {formatTime(currentTime)} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speech Narration Toggle */}
                <button
                  onClick={toggleSpeechNarration}
                  className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
                    ttsActive
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Text-to-speech audio narration"
                >
                  <Mic className="w-3 h-3" />
                  <span className="hidden sm:inline">{ttsActive ? 'Voice ON' : 'Narrate'}</span>
                </button>

                {/* Playback speed toggle */}
                <button
                  onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1))}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 font-mono text-[11px] text-white transition-colors border border-slate-700"
                >
                  {playbackSpeed}x Speed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Drawer: Chapters, Transcript & Related Video Topics */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col max-h-[420px]">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
            <button
              onClick={() => setActiveTab('timestamps')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'timestamps'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" /> Chapters
            </button>

            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'transcript'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Transcript
            </button>

            <button
              onClick={() => setActiveTab('related')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'related'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Related ({relatedTopics.length})
            </button>
          </div>

          {/* Drawer Tab Content */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {/* 1. Timestamps / Video Chapters */}
            {activeTab === 'timestamps' && (
              <div className="space-y-2">
                {video.timestamps.map((ts, idx) => {
                  const isActive =
                    currentTime >= ts.seconds &&
                    (idx === video.timestamps.length - 1 || currentTime < video.timestamps[idx + 1].seconds);

                  return (
                    <div
                      key={idx}
                      onClick={() => seekTo(ts.seconds)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800/80 text-red-950 dark:text-red-200 font-semibold shadow-xs ring-1 ring-red-400/30'
                          : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{ts.title}</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {ts.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{ts.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Live Transcript with Seek on Click */}
            {activeTab === 'transcript' && (
              <div className="space-y-2">
                {video.transcript.map((tr, idx) => (
                  <div
                    key={idx}
                    onClick={() => seekTo(tr.seconds)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                      activeTranscriptIndex === idx
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/80 text-indigo-950 dark:text-indigo-200 font-semibold shadow-xs'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{tr.speaker}</span>
                      <span>{tr.time}</span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed">{tr.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Related Supportive Video Lessons & Curriculum Links */}
            {activeTab === 'related' && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-500 font-medium pb-1">
                  Supportive lessons linked to this topic:
                </div>

                {relatedTopics.length > 0 ? (
                  relatedTopics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 dark:text-white text-xs">{topic.title}</h5>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                          Ch {topic.chapterNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{topic.context}</p>
                      {topic.lessonId && onSelectLesson && (
                        <button
                          onClick={() => onSelectLesson(topic.lessonId!)}
                          className="pt-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open Lesson & Video</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    No related topics listed for this section.
                  </div>
                )}

                {/* Supportive Curriculum Library Preview */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                    Browse Other Supportive Videos
                  </span>
                  <div className="space-y-1.5">
                    {allSupportiveVideos
                      .filter((v) => v.lessonId !== currentLessonId)
                      .slice(0, 3)
                      .map((other, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => onSelectLesson && onSelectLesson(other.lessonId)}
                          className="w-full text-left p-2 rounded-lg bg-slate-100 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-200 text-[11px] flex items-center justify-between transition-colors"
                        >
                          <span className="truncate pr-2 font-medium text-slate-800 dark:text-slate-200">
                            Ch {other.chapterNumber}: {other.lessonTitle}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
