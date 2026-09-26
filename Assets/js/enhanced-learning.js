// ==================================================
// Enhanced Learning Experience - Royal Design System
// Author: WebZoneBW
// Version: 2.0 (Enhanced with Royal Features)
// ==================================================

class EnhancedLearningExperience {
  constructor() {
    this.userProgress = this.loadProgress();
    this.achievements = this.initAchievements();
    this.challenges = this.initChallenges();
    this.community = this.initCommunity();
    this.analytics = this.initAnalytics();
    this.voiceAssistant = this.initVoiceAssistant();
    this.aiTutor = this.initAITutor();
    this.performanceTracker = this.initPerformanceTracker();
    this.init();
  }

  // Load user progress with enhanced features
  loadProgress() {
    const saved = localStorage.getItem('webzonebw_progress');
    const progress = saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      totalXP: 0,
      streak: 0,
      lastActive: new Date().toISOString(),
      completedLessons: [],
      earnedBadges: [],
      currentPath: '01-getting-started',
      learningTime: 0,
      skillLevels: {},
      preferences: {
        theme: 'light',
        fontSize: 'medium',
        learningStyle: 'visual',
        difficulty: 'beginner'
      }
    };
    
    // Update learning time
    this.updateLearningTime(progress);
    return progress;
  }

  // Initialize enhanced achievements system
  initAchievements() {
    return [
      {
        id: 'first-lesson',
        name: 'First Steps',
        icon: '🚀',
        description: 'Complete your first lesson',
        requirement: { type: 'lessons', count: 1 },
        xp: 50,
        rarity: 'common',
        category: 'beginner',
        unlocked: false,
        animation: 'rocket'
      },
      {
        id: 'css-master',
        name: 'CSS Master',
        icon: '🎨',
        description: 'Complete all CSS lessons',
        requirement: { type: 'css', count: 7 },
        xp: 200,
        rarity: 'rare',
        category: 'styling',
        unlocked: false,
        animation: 'sparkle'
      },
      {
        id: 'javascript-ninja',
        name: 'JavaScript Ninja',
        icon: '⚡',
        description: 'Complete all JavaScript lessons',
        requirement: { type: 'javascript', count: 10 },
        xp: 300,
        rarity: 'epic',
        category: 'programming',
        unlocked: false,
        animation: 'lightning'
      },
      {
        id: 'week-streak',
        name: 'Week Warrior',
        icon: '🔥',
        description: '7-day learning streak',
        requirement: { type: 'streak', count: 7 },
        xp: 150,
        rarity: 'rare',
        category: 'consistency',
        unlocked: false,
        animation: 'fire'
      },
      {
        id: 'project-builder',
        name: 'Project Builder',
        icon: '🏗️',
        description: 'Complete final project',
        requirement: { type: 'project', count: 1 },
        xp: 400,
        rarity: 'legendary',
        category: 'projects',
        unlocked: false,
        animation: 'construction'
      },
      {
        id: 'speed-learner',
        name: 'Speed Learner',
        icon: '⚡',
        description: 'Complete 5 lessons in one day',
        requirement: { type: 'daily', count: 5 },
        xp: 100,
        rarity: 'rare',
        category: 'speed',
        unlocked: false,
        animation: 'speed'
      },
      {
        id: 'perfectionist',
        name: 'Perfectionist',
        icon: '💎',
        description: 'Achieve 100% score on 3 quizzes',
        requirement: { type: 'quizzes', count: 3, score: 100 },
        xp: 150,
        rarity: 'epic',
        category: 'accuracy',
        unlocked: false,
        animation: 'diamond'
      },
      {
        id: 'community-hero',
        name: 'Community Hero',
        icon: '👑',
        description: 'Help 10 fellow learners',
        requirement: { type: 'community', count: 10 },
        xp: 200,
        rarity: 'legendary',
        category: 'community',
        unlocked: false,
        animation: 'crown'
      }
    ];
  }

  // Initialize enhanced challenges system
  initChallenges() {
    return [
      {
        id: 'daily-css',
        title: 'CSS Flexbox Challenge',
        description: 'Build a responsive navigation menu using Flexbox',
        xp: 50,
        streak: 2,
        difficulty: 'medium',
        category: 'css',
        type: 'coding',
        timeLimit: 30,
        hints: 3,
        resources: ['flexbox-guide', 'examples'],
        unlocked: true,
        completed: false
      },
      {
        id: 'daily-js',
        title: 'JavaScript DOM Manipulation',
        description: 'Create an interactive todo list',
        xp: 75,
        streak: 3,
        difficulty: 'hard',
        category: 'javascript',
        type: 'coding',
        timeLimit: 45,
        hints: 2,
        resources: ['dom-guide', 'examples'],
        unlocked: true,
        completed: false
      },
      {
        id: 'daily-html',
        title: 'Semantic HTML Practice',
        description: 'Structure a blog post with proper semantic tags',
        xp: 40,
        streak: 1,
        difficulty: 'easy',
        category: 'html',
        type: 'markup',
        timeLimit: 20,
        hints: 4,
        resources: ['semantic-guide', 'examples'],
        unlocked: true,
        completed: false
      },
      {
        id: 'weekly-challenge',
        title: 'Responsive Web Design',
        description: 'Create a fully responsive website',
        xp: 200,
        streak: 7,
        difficulty: 'hard',
        category: 'responsive',
        type: 'project',
        timeLimit: 120,
        hints: 1,
        resources: ['responsive-guide', 'frameworks'],
        unlocked: false,
        completed: false
      }
    ];
  }

  // Initialize enhanced community features
  initCommunity() {
    return {
      recentActivity: [
        {
          user: 'Alex Chen',
          avatar: 'https://picsum.photos/seed/alex/40/40.jpg',
          action: 'completed',
          lesson: 'CSS Box Model',
          time: '2 minutes ago',
          xp: 50,
          level: 3
        },
        {
          user: 'Sarah Johnson',
          avatar: 'https://picsum.photos/seed/sarah/40/40.jpg',
          action: 'earned',
          badge: 'CSS Master',
          time: '15 minutes ago',
          xp: 200,
          level: 5
        },
        {
          user: 'Mike Davis',
          avatar: 'https://picsum.photos/seed/mike/40/40.jpg',
          action: 'started',
          lesson: 'JavaScript Functions',
          time: '1 hour ago',
          level: 2
        }
      ],
      globalLeaderboard: [
        { name: 'Emma Wilson', xp: 1250, level: 8, avatar: 'https://picsum.photos/seed/emma/32/32.jpg' },
        { name: 'John Smith', xp: 980, level: 7, avatar: 'https://picsum.photos/seed/john/32/32.jpg' },
        { name: 'Lisa Brown', xp: 750, level: 6, avatar: 'https://picsum.photos/seed/lisa/32/32.jpg' }
      ],
      studyGroups: [
        { name: 'HTML Beginners', members: 12, topic: 'HTML Fundamentals' },
        { name: 'CSS Masters', members: 8, topic: 'Advanced CSS' },
        { name: 'JavaScript Club', members: 15, topic: 'JavaScript Programming' }
      ],
      discussions: [
        { title: 'How to center elements in CSS?', author: 'Newbie Coder', replies: 23, views: 156 },
        { title: 'Best practices for JavaScript', author: 'Dev Pro', replies: 45, views: 289 },
        { title: 'Responsive design tips', author: 'Designer X', replies: 18, views: 134 }
      ]
    };
  }

  // Initialize analytics system
  initAnalytics() {
    return {
      learningPatterns: {
        bestTime: '19:00',
        averageSession: 25,
        completedPerWeek: 3,
        retentionRate: 85
      },
      performanceMetrics: {
        accuracy: 92,
        speed: 78,
        consistency: 88,
        improvement: 15
      },
      skillAssessment: {
        html: { level: 4, progress: 85, nextMilestone: 'Semantic HTML' },
        css: { level: 3, progress: 60, nextMilestone: 'Flexbox Mastery' },
        javascript: { level: 2, progress: 40, nextMilestone: 'DOM Manipulation' },
        responsive: { level: 3, progress: 70, nextMilestone: 'Advanced Grid' }
      }
    };
  }

  // Initialize voice assistant
  initVoiceAssistant() {
    return {
      enabled: false,
      commands: {
        'start lesson': 'startLesson',
        'explain concept': 'explainConcept',
        'show progress': 'showProgress',
        'next challenge': 'nextChallenge',
        'help me': 'provideHelp'
      },
      responses: {
        welcome: "Welcome to WebZoneBW! I'm your learning assistant. How can I help you today?",
        lessonComplete: "Congratulations on completing the lesson! Ready for the next challenge?",
        needHelp: "I'm here to help! Would you like me to explain the concept or show you some examples?"
      }
    };
  }

  // Initialize AI tutor
  initAITutor() {
    return {
      available: true,
      context: '',
      history: [],
      capabilities: [
        'conceptExplanation',
        'codeReview',
        'debuggingHelp',
        'bestPractices',
        'projectGuidance'
      ],
      responseTime: 1500,
      accuracy: 94
    };
  }

  // Initialize performance tracker
  initPerformanceTracker() {
    return {
      sessionStartTime: Date.now(),
      lessonsCompleted: 0,
      challengesCompleted: 0,
      timeSpent: 0,
      accuracy: 0,
      mistakes: [],
      achievements: [],
      milestones: []
    };
  }

  // Initialize the enhanced learning experience
  init() {
    this.updateUI();
    this.startStreakTracking();
    this.loadDailyChallenges();
    this.initEventListeners();
    this.startPerformanceTracking();
    this.initVoiceAssistant();
    this.initAITutor();
    this.showWelcomeMessage();
  }

  // Update UI with enhanced features
  updateUI() {
    this.updateProgressBar();
    this.updateLevel();
    this.updateAchievements();
    this.updateChallenges();
    this.updateCommunity();
    this.updateAnalytics();
    this.updatePerformanceMetrics();
  }

  // Enhanced XP progress bar with animations
  updateProgressBar() {
    const xpBar = document.querySelector('.xp-fill');
    const xpInfo = document.querySelector('.xp-needed');
    const levelDisplay = document.querySelector('.current-level');
    
    if (xpBar && xpInfo && levelDisplay) {
      const currentLevelXP = this.getLevelXP(this.userProgress.level);
      const nextLevelXP = this.getLevelXP(this.userProgress.level + 1);
      const progress = ((this.userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
      
      // Animate progress bar
      xpBar.style.width = `${Math.min(progress, 100)}%`;
      xpInfo.textContent = `${this.userProgress.xp}/${nextLevelXP} XP`;
      
      // Update level display with enhanced styling
      levelDisplay.textContent = `${this.getLevelTitle()} (Level ${this.userProgress.level})`;
      
      // Add celebration for level up
      if (progress >= 100) {
        this.showLevelUpAnimation();
      }
    }
  }

  // Enhanced level system with titles
  getLevelTitle() {
    const titles = [
      'Web Beginner', 'HTML Learner', 'CSS Apprentice', 'JavaScript Novice',
      'Frontend Developer', 'Web Engineer', 'Full Stack Developer', 'Senior Developer',
      'Tech Lead', 'Principal Engineer', 'Engineering Manager', 'CTO'
    ];
    return titles[Math.min(this.userProgress.level - 1, titles.length - 1)];
  }

  // Enhanced achievements display with animations
  updateAchievements() {
    const achievementsContainer = document.querySelector('.achievements');
    if (!achievementsContainer) return;

    achievementsContainer.innerHTML = '';
    
    this.achievements.forEach(achievement => {
      const isEarned = this.userProgress.earnedBadges.includes(achievement.id);
      const rarityClass = achievement.rarity || 'common';
      
      const badge = document.createElement('div');
      badge.className = `badge ${isEarned ? 'earned' : 'locked'} ${rarityClass}`;
      badge.innerHTML = `
        <div class="badge-icon ${isEarned ? `animate-${achievement.animation}` : ''}">${achievement.icon}</div>
        <div class="badge-content">
          <div class="badge-name">${achievement.name}</div>
          <div class="badge-description">${achievement.description}</div>
          <div class="badge-rarity">${rarityClass}</div>
        </div>
        ${!isEarned ? `<div class="badge-requirement">Need: ${this.getRequirementText(achievement)}</div>` : ''}
      `;
      
      if (isEarned) {
        badge.addEventListener('click', () => this.showAchievementDetails(achievement));
      }
      
      achievementsContainer.appendChild(badge);
    });
  }

  // Get requirement text for achievements
  getRequirementText(achievement) {
    const req = achievement.requirement;
    switch (req.type) {
      case 'lessons':
        return `${req.count} lessons`;
      case 'css':
        return `${req.count} CSS lessons`;
      case 'javascript':
        return `${req.count} JavaScript lessons`;
      case 'streak':
        return `${req.count} day streak`;
      case 'project':
        return `${req.count} project`;
      case 'daily':
        return `${req.count} lessons in one day`;
      case 'quizzes':
        return `${req.count} quizzes at ${req.score}%`;
      case 'community':
        return `${req.count} helps`;
      default:
        return `${req.count} ${req.type}`;
    }
  }

  // Enhanced challenges display
  updateChallenges() {
    const challengesContainer = document.querySelector('.challenges-container');
    if (!challengesContainer) return;

    challengesContainer.innerHTML = '';
    
    this.challenges.forEach(challenge => {
      const challengeCard = document.createElement('div');
      challengeCard.className = `challenge-card royal-card ${challenge.difficulty}`;
      challengeCard.innerHTML = `
        <div class="challenge-header">
          <span class="challenge-difficulty">${challenge.difficulty}</span>
          <span class="challenge-xp">+${challenge.xp} XP</span>
          <span class="challenge-streak">⭐ ${challenge.streak}x</span>
        </div>
        <h3>${challenge.title}</h3>
        <p>${challenge.description}</p>
        <div class="challenge-meta">
          <span class="challenge-time">⏱️ ${challenge.timeLimit} min</span>
          <span class="category">${challenge.category}</span>
        </div>
        <div class="challenge-rewards">
          <span class="reward-item xp">🎁 +${challenge.xp} XP</span>
          <span class="reward-item streak">⭐ ${challenge.streak}x Streak</span>
        </div>
        <button class="royal-btn royal-btn-primary" onclick="gameEngine.startChallenge('${challenge.id}')">
          ${challenge.completed ? 'Completed' : 'Start Challenge'}
        </button>
      `;
      
      challengesContainer.appendChild(challengeCard);
    });
  }

  // Enhanced community features
  updateCommunity() {
    const activityContainer = document.querySelector('.recent-activity');
    const leaderboardContainer = document.querySelector('.leaderboard-list');
    const groupsContainer = document.querySelector('.study-groups');
    
    // Update activity feed
    if (activityContainer) {
      activityContainer.innerHTML = this.community.recentActivity.map(activity => `
        <div class="activity-item">
          <img src="${activity.avatar}" class="user-avatar" alt="${activity.user}">
          <div class="activity-text">
            <span class="user-name">${activity.user}</span>
            ${activity.action === 'completed' ? 'completed' : activity.action === 'earned' ? 'earned' : 'started'}
            <span class="lesson-title">${activity.lesson || activity.badge}</span>
            <span class="activity-time">${activity.time}</span>
          </div>
          <div class="activity-xp">+${activity.xp} XP</div>
        </div>
      `).join('');
    }
    
    // Update leaderboard
    if (leaderboardContainer) {
      leaderboardContainer.innerHTML = this.community.globalLeaderboard.map((user, index) => `
        <div class="leaderboard-item">
          <span class="rank">${index + 1}</span>
          <img src="${user.avatar}" class="leader-avatar" alt="${user.name}">
          <div class="leader-info">
            <span class="leader-name">${user.name}</span>
            <span class="leader-level">Level ${user.level}</span>
          </div>
          <span class="leader-xp">${user.xp} XP</span>
        </div>
      `).join('');
    }
    
    // Update study groups
    if (groupsContainer) {
      groupsContainer.innerHTML = this.community.studyGroups.map(group => `
        <div class="study-group">
          <div class="group-info">
            <h4>${group.name}</h4>
            <p>${group.topic}</p>
          </div>
          <div class="group-members">
            <span>👥 ${group.members} members</span>
            <button class="royal-btn royal-btn-secondary">Join</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Enhanced analytics display
  updateAnalytics() {
    const analyticsContainer = document.querySelector('.analytics-container');
    if (!analyticsContainer) return;

    const analytics = this.analytics;
    
    analyticsContainer.innerHTML = `
      <div class="analytics-grid">
        <div class="analytics-card">
          <h4>📊 Learning Patterns</h4>
          <div class="analytics-item">
            <span>Best Time:</span>
            <span>${analytics.learningPatterns.bestTime}</span>
          </div>
          <div class="analytics-item">
            <span>Avg Session:</span>
            <span>${analytics.learningPatterns.averageSession} min</span>
          </div>
          <div class="analytics-item">
            <span>Weekly Progress:</span>
            <span>${analytics.learningPatterns.completedPerWeek} lessons</span>
          </div>
        </div>
        
        <div class="analytics-card">
          <h4>🎯 Performance Metrics</h4>
          <div class="analytics-item">
            <span>Accuracy:</span>
            <span>${analytics.performanceMetrics.accuracy}%</span>
          </div>
          <div class="analytics-item">
            <span>Speed:</span>
            <span>${analytics.performanceMetrics.speed}%</span>
          </div>
          <div class="analytics-item">
            <span>Consistency:</span>
            <span>${analytics.performanceMetrics.consistency}%</span>
          </div>
        </div>
        
        <div class="analytics-card">
          <h4>📈 Skill Assessment</h4>
          ${Object.entries(analytics.skillAssessment).map(([skill, data]) => `
            <div class="skill-progress">
              <span class="skill-name">${skill.toUpperCase()}</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: ${data.progress}%"></div>
              </div>
              <span class="skill-level">Level ${data.level}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Enhanced performance tracking
  startPerformanceTracking() {
    this.performanceTracker.sessionStartTime = Date.now();
    
    // Track mistakes
    document.addEventListener('error', (e) => {
      this.performanceTracker.mistakes.push({
        timestamp: Date.now(),
        type: e.type,
        message: e.message,
        lesson: this.getCurrentLesson()
      });
    });
    
    // Track achievements
    document.addEventListener('achievement', (e) => {
      this.performanceTracker.achievements.push(e.detail);
    });
  }

  // Get current lesson
  getCurrentLesson() {
    const path = window.location.pathname;
    const lessonMatch = path.match(/\/lessons\/([^\/]+)/);
    return lessonMatch ? lessonMatch[1] : 'unknown';
  }

  // Enhanced streak tracking
  startStreakTracking() {
    const now = new Date();
    const lastActive = new Date(this.userProgress.lastActive);
    const daysDiff = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      this.userProgress.streak++;
      this.addXP(10, 'Daily streak bonus!');
    } else if (daysDiff > 1) {
      this.userProgress.streak = 1;
    }

    this.userProgress.lastActive = now.toISOString();
    this.saveProgress();
  }

  // Update learning time
  updateLearningTime(progress) {
    const sessionTime = Date.now() - progress.sessionStartTime || 0;
    progress.learningTime += Math.floor(sessionTime / 1000 / 60); // Convert to minutes
    this.userProgress = progress;
  }

  // Enhanced achievement system
  unlockAchievement(achievement) {
    if (!this.userProgress.earnedBadges.includes(achievement.id)) {
      this.userProgress.earnedBadges.push(achievement.id);
      this.addXP(achievement.xp, `Achievement unlocked: ${achievement.name}`);
      
      // Show enhanced celebration
      this.showAchievementCelebration(achievement);
      
      // Trigger achievement event
      document.dispatchEvent(new CustomEvent('achievement', {
        detail: achievement
      }));
    }
  }

  // Show achievement celebration with animations
  showAchievementCelebration(achievement) {
    const celebration = document.createElement('div');
    celebration.className = 'achievement-celebration';
    celebration.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-icon animate-${achievement.animation}">${achievement.icon}</div>
        <div class="celebration-text">
          <h3>Achievement Unlocked!</h3>
          <p>${achievement.name}</p>
          <p>+${achievement.xp} XP</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 5000);
  }

  // Show level up animation
  showLevelUpAnimation() {
    const levelUp = document.createElement('div');
    levelUp.className = 'level-up-celebration';
    levelUp.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">🎉</div>
        <div class="level-up-text">
          <h3>Level Up!</h3>
          <p>You are now Level ${this.userProgress.level}</p>
          <p>${this.getLevelTitle()}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(levelUp);
    
    setTimeout(() => {
      levelUp.remove();
    }, 4000);
  }

  // Enhanced challenge system
  startChallenge(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge) {
      this.showChallengeModal(challenge);
    }
  }

  // Show challenge modal with enhanced features
  showChallengeModal(challenge) {
    const modal = document.createElement('div');
    modal.className = 'challenge-modal royal-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>🎯 ${challenge.title}</h3>
          <div class="challenge-meta">
            <span class="difficulty">${challenge.difficulty}</span>
            <span class="time">⏱️ ${challenge.timeLimit} min</span>
            <span class="category">${challenge.category}</span>
          </div>
        </div>
        <div class="modal-body">
          <p>${challenge.description}</p>
          <div class="challenge-rewards">
            <div class="reward-item xp">🎁 +${challenge.xp} XP</div>
            <div class="reward-item streak">⭐ ${challenge.streak}x Streak</div>
          </div>
          <div class="challenge-resources">
            <h4>Resources:</h4>
            <ul>
              ${challenge.resources.map(resource => `<li>📚 ${resource}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="modal-actions">
          <button class="royal-btn royal-btn-secondary" onclick="this.closest('.challenge-modal').remove()">
            Cancel
          </button>
          <button class="royal-btn royal-btn-primary" onclick="gameEngine.acceptChallenge('${challenge.id}'); this.closest('.challenge-modal').remove();">
            Accept Challenge
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // Accept challenge with enhanced features
  acceptChallenge(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge) {
      this.showCelebration(`Challenge accepted: ${challenge.title}! Good luck! 🚀`);
      this.startChallengeTimer(challenge);
    }
  }

  // Start challenge timer
  startChallengeTimer(challenge) {
    const timer = document.createElement('div');
    timer.className = 'challenge-timer';
    timer.innerHTML = `
      <div class="timer-content">
        <div class="timer-icon">⏱️</div>
        <div class="timer-display">${challenge.timeLimit}:00</div>
        <div class="timer-progress"></div>
      </div>
    `;
    
    document.body.appendChild(timer);
    
    let timeLeft = challenge.timeLimit * 60;
    const timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timer.querySelector('.timer-display').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timer.remove();
        this.showChallengeTimeout();
      }
    }, 1000);
  }

  // Show challenge timeout
  showChallengeTimeout() {
    const timeout = document.createElement('div');
    timeout.className = 'challenge-timeout';
    timeout.innerHTML = `
      <div class="timeout-content">
        <div class="timeout-icon">⏰</div>
        <h3>Time's Up!</h3>
        <p>The challenge has ended. Better luck next time!</p>
        <button class="royal-btn royal-btn-primary" onclick="this.closest('.challenge-timeout').remove()">
          Try Again
        </button>
      </div>
    `;
    
    document.body.appendChild(timeout);
  }

  // Enhanced celebration system
  showCelebration(message) {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-icon">🎉</div>
        <h3>${message}</h3>
      </div>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 3000);
  }

  // Show welcome message
  showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.className = 'welcome-message';
    welcome.innerHTML = `
      <div class="welcome-content">
        <div class="welcome-icon">👋</div>
        <h3>Welcome back, ${this.userProgress.name || 'Learner'}!</h3>
        <p>You're on a ${this.userProgress.streak} day streak. Keep it up! 🔥</p>
        <div class="quick-stats">
          <div class="stat-item">
            <span class="stat-number">${this.userProgress.level}</span>
            <span class="stat-label">Level</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${this.userProgress.xp}</span>
            <span class="stat-label">XP</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${this.userProgress.earnedBadges.length}</span>
            <span class="stat-label">Badges</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(welcome);
    
    setTimeout(() => {
      welcome.remove();
    }, 5000);
  }

  // Enhanced save progress
  saveProgress() {
    localStorage.setItem('webzonebw_progress', JSON.stringify(this.userProgress));
  }

  // Enhanced XP calculation
  addXP(amount, reason = '') {
    this.userProgress.xp += amount;
    this.userProgress.totalXP += amount;
    
    // Check for level up
    const nextLevelXP = this.getLevelXP(this.userProgress.level + 1);
    if (this.userProgress.xp >= nextLevelXP) {
      this.levelUp();
    }
    
    if (reason) {
      console.log(`+${amount} XP: ${reason}`);
    }
    
    this.saveProgress();
  }

  // Calculate XP needed for level
  getLevelXP(level) {
    return (level - 1) * 500 + 100;
  }

  // Level up with enhanced features
  levelUp() {
    this.userProgress.level++;
    this.showLevelUpAnimation();
    this.checkAchievements();
    this.saveProgress();
  }

  // Check achievements with enhanced logic
  checkAchievements() {
    this.achievements.forEach(achievement => {
      if (!this.userProgress.earnedBadges.includes(achievement.id)) {
        if (this.meetsRequirement(achievement.requirement)) {
          this.unlockAchievement(achievement);
        }
      }
    });
  }

  // Check if user meets requirement
  meetsRequirement(requirement) {
    switch (requirement.type) {
      case 'lessons':
        return this.userProgress.completedLessons.length >= requirement.count;
      case 'css':
        return this.getCompletedLessonsByCategory('css').length >= requirement.count;
      case 'javascript':
        return this.getCompletedLessonsByCategory('javascript').length >= requirement.count;
      case 'streak':
        return this.userProgress.streak >= requirement.count;
      case 'project':
        return this.userProgress.completedProjects >= requirement.count;
      case 'daily':
        return this.getDailyLessonsCompleted() >= requirement.count;
      case 'quizzes':
        return this.getPerfectQuizzes() >= requirement.count;
      case 'community':
        return this.getCommunityHelps() >= requirement.count;
      default:
        return false;
    }
  }

  // Get completed lessons by category
  getCompletedLessonsByCategory(category) {
    return this.userProgress.completedLessons.filter(lessonId => 
      lessonId.includes(category.toLowerCase())
    );
  }

  // Get daily lessons completed
  getDailyLessonsCompleted() {
    const today = new Date().toDateString();
    return this.userProgress.completedLessons.filter(lessonId => {
      const completionDate = this.userProgress.completionTimestamps?.[lessonId];
      return completionDate && new Date(completionDate).toDateString() === today;
    }).length;
  }

  // Get perfect quizzes
  getPerfectQuizzes() {
    return Object.values(this.userProgress.quizScores).filter(score => score >= 100).length;
  }

  // Get community helps
  getCommunityHelps() {
    return this.userProgress.communityHelps || 0;
  }

  // Initialize event listeners
  initEventListeners() {
    // Lesson completion
    document.addEventListener('lessonCompleted', (e) => {
      this.completeLesson(e.detail.lessonId, e.detail.xp);
    });

    // Challenge completion
    document.addEventListener('challengeCompleted', (e) => {
      this.completeChallenge(e.detail.challengeId, e.detail.xp);
    });

    // Voice assistant
    document.addEventListener('voiceCommand', (e) => {
      this.handleVoiceCommand(e.detail.command);
    });

    // AI tutor requests
    document.addEventListener('aiRequest', (e) => {
      this.handleAIRequest(e.detail);
    });
  }

  // Complete lesson with enhanced features
  completeLesson(lessonId, xp = 50) {
    if (!this.userProgress.completedLessons.includes(lessonId)) {
      this.userProgress.completedLessons.push(lessonId);
      this.addXP(xp, `Completed lesson: ${lessonId}`);
      this.checkAchievements();
      this.saveProgress();
      this.updateUI();
      
      // Show celebration
      this.showCelebration('Lesson Completed! 🎉');
    }
  }

  // Complete challenge with enhanced features
  completeChallenge(challengeId, xp = 100) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge) {
      challenge.completed = true;
      this.addXP(challenge.xp, `Completed challenge: ${challenge.title}`);
      this.userProgress.streak += challenge.streak;
      this.checkAchievements();
      this.saveProgress();
      this.updateUI();
      
      // Show celebration
      this.showCelebration('Challenge Completed! 🏆');
    }
  }

  // Handle voice commands
  handleVoiceCommand(command) {
    const normalizedCommand = command.toLowerCase();
    
    if (normalizedCommand.includes('start lesson')) {
      this.startNextLesson();
    } else if (normalizedCommand.includes('explain concept')) {
      this.explainCurrentConcept();
    } else if (normalizedCommand.includes('show progress')) {
      this.showProgress();
    } else if (normalizedCommand.includes('next challenge')) {
      this.startNextChallenge();
    } else if (normalizedCommand.includes('help me')) {
      this.provideHelp();
    }
  }

  // Handle AI requests
  async handleAIRequest(request) {
    if (this.aiTutor.available) {
      try {
        const response = await this.getAIResponse(request);
        this.showAIResponse(response);
      } catch (error) {
        this.showAIResponse('I apologize, but I\'m having trouble responding right now. Please try again later.');
      }
    }
  }

  // Get AI response (placeholder)
  async getAIResponse(request) {
    // This would integrate with the actual AI service
    return `I understand you're asking about: ${request}. Let me help you with that...`;
  }

  // Show AI response
  showAIResponse(response) {
    const aiResponse = document.createElement('div');
    aiResponse.className = 'ai-response';
    aiResponse.innerHTML = `
      <div class="ai-content">
        <div class="ai-avatar">🤖</div>
        <div class="ai-message">${response}</div>
      </div>
    `;
    
    document.body.appendChild(aiResponse);
    
    setTimeout(() => {
      aiResponse.remove();
    }, 8000);
  }

  // Start next lesson
  startNextLesson() {
    const nextLesson = this.getNextLesson();
    if (nextLesson) {
      window.location.href = nextLesson;
    }
  }

  // Get next lesson
  getNextLesson() {
    // This would determine the next lesson based on progress
    return '/Chapters/Chapter-01-Development%20Environment/Lesson-01-Your-First-Webpage/standard-lesson.html';
  }

  // Explain current concept
  explainCurrentConcept() {
    const currentLesson = this.getCurrentLesson();
    this.showAIResponse(`Let me explain the concept for lesson: ${currentLesson}`);
  }

  // Show progress
  showProgress() {
    const progressModal = document.createElement('div');
    progressModal.className = 'progress-modal royal-modal';
    progressModal.innerHTML = `
      <div class="modal-content">
        <h3>📊 Your Learning Progress</h3>
        <div class="progress-summary">
          <div class="progress-item">
            <span class="progress-label">Level:</span>
            <span class="progress-value">${this.userProgress.level}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">XP:</span>
            <span class="progress-value">${this.userProgress.xp}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Streak:</span>
            <span class="progress-value">${this.userProgress.streak} days</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Lessons:</span>
            <span class="progress-value">${this.userProgress.completedLessons.length}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Badges:</span>
            <span class="progress-value">${this.userProgress.earnedBadges.length}</span>
          </div>
        </div>
        <button class="royal-btn royal-btn-primary" onclick="this.closest('.progress-modal').remove()">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(progressModal);
  }

  // Start next challenge
  startNextChallenge() {
    const nextChallenge = this.getNextChallenge();
    if (nextChallenge) {
      this.startChallenge(nextChallenge.id);
    }
  }

  // Get next challenge
  getNextChallenge() {
    return this.challenges.find(c => !c.completed);
  }

  // Provide help
  provideHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'help-modal royal-modal';
    helpModal.innerHTML = `
      <div class="modal-content">
        <h3>🆘 Need Help?</h3>
        <div class="help-options">
          <div class="help-option" onclick="gameEngine.explainCurrentConcept(); this.closest('.help-modal').remove();">
            <div class="help-icon">💡</div>
            <div class="help-text">Explain Current Concept</div>
          </div>
          <div class="help-option" onclick="gameEngine.showHint(); this.closest('.help-modal').remove();">
            <div class="help-icon">🎯</div>
            <div class="help-text">Show Hint</div>
          </div>
          <div class="help-option" onclick="gameEngine.showExamples(); this.closest('.help-modal').remove();">
            <div class="help-icon">📚</div>
            <div class="help-text">Show Examples</div>
          </div>
          <div class="help-option" onclick="gameEngine.askCommunity(); this.closest('.help-modal').remove();">
            <div class="help-icon">👥</div>
            <div class="help-text">Ask Community</div>
          </div>
        </div>
        <button class="royal-btn royal-btn-secondary" onclick="this.closest('.help-modal').remove()">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(helpModal);
  }

  // Show hint
  showHint() {
    this.showAIResponse('💡 Hint: Try breaking down the problem into smaller steps and tackle them one at a time.');
  }

  // Show examples
  showExamples() {
    this.showAIResponse('📚 Here are some examples to help you understand the concept better...');
  }

  // Ask community
  askCommunity() {
    this.showAIResponse('👥 Asking the community for help... Check the discussion forum for responses!');
  }

  // Export progress
  exportProgress() {
    return {
      ...this.userProgress,
      exportDate: new Date().toISOString(),
      analytics: this.analytics,
      achievements: this.achievements.filter(a => this.userProgress.earnedBadges.includes(a.id))
    };
  }

  // Import progress
  importProgress(progressData) {
    this.userProgress = progressData;
    this.saveProgress();
    this.updateUI();
  }
}

// Initialize the enhanced learning experience when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.enhancedLearning = new EnhancedLearningExperience();
});

// Global functions for external use
window.completeLesson = function(lessonId, xp = 50) {
  if (window.enhancedLearning) {
    window.enhancedLearning.completeLesson(lessonId, xp);
  }
};

window.completeChallenge = function(challengeId, xp = 100) {
  if (window.enhancedLearning) {
    window.enhancedLearning.completeChallenge(challengeId, xp);
  }
};

window.startChallenge = function(challengeId) {
  if (window.enhancedLearning) {
    window.enhancedLearning.startChallenge(challengeId);
  }
};

window.showProgress = function() {
  if (window.enhancedLearning) {
    window.enhancedLearning.showProgress();
  }
};

window.getHelp = function() {
  if (window.enhancedLearning) {
    window.enhancedLearning.provideHelp();
  }
};