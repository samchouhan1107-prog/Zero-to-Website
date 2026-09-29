/**
 * WebZoneBW.shop Interactive Quiz System
 * Provides real-time quiz functionality with hints, scoring, and progress tracking
 */

class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.userAnswers = {};
        this.score = 0;
        this.hintsUsed = 0;
        this.startTime = null;
        this.initializeQuizSystem();
    }

    /**
     * Initialize the quiz system
     */
    initializeQuizSystem() {
        this.setupEventListeners();
        this.loadQuizProgress();
    }

    /**
     * Setup event listeners for quiz interactions
     */
    setupEventListeners() {
        document.addEventListener('click', (e) => this.handleQuizClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    /**
     * Load quiz progress from localStorage
     */
    loadQuizProgress() {
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.userAnswers = progress.userAnswers || {};
            this.score = progress.score || 0;
            this.hintsUsed = progress.hintsUsed || 0;
        }
    }

    /**
     * Save quiz progress to localStorage
     */
    saveQuizProgress() {
        const progress = {
            userAnswers: this.userAnswers,
            score: this.score,
            hintsUsed: this.hintsUsed,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('quizProgress', JSON.stringify(progress));
    }

    /**
     * Start a new quiz
     */
    startQuiz(quizData) {
        this.currentQuiz = quizData;
        this.userAnswers = {};
        this.score = 0;
        this.hintsUsed = 0;
        this.startTime = Date.now();
        
        this.renderQuiz();
        this.saveQuizProgress();
    }

    /**
     * Render quiz interface
     */
    renderQuiz() {
        if (!this.currentQuiz) return;

        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        quizContainer.innerHTML = this.generateQuizHTML();
        
        // Add interactive event listeners
        this.attachQuizEventListeners();
    }

    /**
     * Generate quiz HTML
     */
    generateQuizHTML() {
        const { title, questions, timeLimit } = this.currentQuiz;
        
        return `
            <div class="quiz-interface">
                <div class="quiz-header">
                    <h2>${title}</h2>
                    <div class="quiz-stats">
                        <span class="quiz-score">Score: ${this.score}/${this.currentQuiz.questions.length}</span>
                        <span class="quiz-hints">Hints: ${this.hintsUsed}</span>
                        ${timeLimit ? `<span class="quiz-timer">Time: ${this.formatTime(timeLimit)}</span>` : ''}
                    </div>
                </div>
                
                <div class="quiz-content">
                    ${this.generateQuestionsHTML()}
                </div>
                
                <div class="quiz-controls">
                    <button onclick="quizSystem.checkAnswers()" class="btn-primary">Check Answers</button>
                    <button onclick="quizSystem.resetQuiz()" class="btn-secondary">Reset Quiz</button>
                    ${this.generateHintButton()}
                </div>
                
                <div id="quiz-feedback" class="quiz-feedback"></div>
            </div>
        `;
    }

    /**
     * Generate questions HTML
     */
    generateQuestionsHTML() {
        return this.currentQuiz.questions.map((question, index) => `
            <div class="quiz-question" data-question="${index}">
                <h3>Question ${index + 1}: ${question.text}</h3>
                <div class="question-options">
                    ${question.options.map((option, optionIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optionIndex}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="question-feedback" id="feedback-${index}"></div>
                ${question.hint ? `<div class="question-hint" id="hint-${index}">💡 Hint: ${question.hint}</div>` : ''}
            </div>
        `).join('');
    }

    /**
     * Generate hint button
     */
    generateHintButton() {
        if (!this.currentQuiz || !this.currentQuiz.hintsAvailable) return '';
        
        return `<button onclick="quizSystem.showHint()" class="btn-hint">💡 Show Hint</button>`;
    }

    /**
     * Show hint for current question
     */
    showHint() {
        const currentQuestionIndex = this.getCurrentQuestionIndex();
        if (currentQuestionIndex === -1) return;

        const hintElement = document.getElementById(`hint-${currentQuestionIndex}`);
        if (hintElement) {
            hintElement.style.display = 'block';
            this.hintsUsed++;
            this.saveQuizProgress();
            this.updateQuizStats();
        }
    }

    /**
     * Get current question index
     */
    getCurrentQuestionIndex() {
        const checkedInputs = document.querySelectorAll('.quiz-option input:checked');
        if (checkedInputs.length === 0) return -1;
        
        const checkedInput = checkedInputs[0];
        const questionDiv = checkedInput.closest('.quiz-question');
        return parseInt(questionDiv.dataset.question);
    }

    /**
     * Handle quiz click events
     */
    handleQuizClick(e) {
        if (e.target.matches('.quiz-option input')) {
            const questionIndex = this.getQuestionIndexFromInput(e.target);
            this.userAnswers[questionIndex] = parseInt(e.target.value);
            this.saveQuizProgress();
        }
    }

    /**
     * Get question index from input element
     */
    getQuestionIndexFromInput(input) {
        const questionDiv = input.closest('.quiz-question');
        return parseInt(questionDiv.dataset.question);
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        if (!this.currentQuiz) return;

        switch(e.key) {
            case 'ArrowDown':
                this.navigateQuestion(1);
                break;
            case 'ArrowUp':
                this.navigateQuestion(-1);
                break;
            case 'Enter':
                this.submitQuiz();
                break;
            case 'h':
            case 'H':
                this.showHint();
                break;
        }
    }

    /**
     * Navigate between questions
     */
    navigateQuestion(direction) {
        const questions = document.querySelectorAll('.quiz-question');
        const currentQuestion = document.querySelector('.quiz-question:focus-within');
        
        if (currentQuestion) {
            const currentIndex = Array.from(questions).indexOf(currentQuestion);
            const newIndex = Math.max(0, Math.min(questions.length - 1, currentIndex + direction));
            questions[newIndex].focus();
        }
    }

    /**
     * Check all answers and provide feedback
     */
    checkAnswers() {
        let correctCount = 0;
        const feedback = [];

        this.currentQuiz.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (isCorrect) {
                correctCount++;
                feedback.push(`✅ Question ${index + 1}: Correct!`);
                this.showQuestionFeedback(index, 'correct', question.explanation);
            } else {
                feedback.push(`❌ Question ${index + 1}: Incorrect. ${question.explanation}`);
                this.showQuestionFeedback(index, 'incorrect', question.explanation);
            }
        });

        this.score = correctCount;
        this.saveQuizProgress();
        this.showQuizSummary(correctCount, this.currentQuiz.questions.length);
        this.updateQuizStats();
    }

    /**
     * Show feedback for specific question
     */
    showQuestionFeedback(questionIndex, type, explanation) {
        const feedbackElement = document.getElementById(`feedback-${questionIndex}`);
        const icon = type === 'correct' ? '✅' : '❌';
        const color = type === 'correct' ? '#22c55e' : '#ef4444';
        
        feedbackElement.innerHTML = `
            <div class="feedback-${type}">
                <span style="color: ${color};">${icon}</span>
                <span>${explanation}</span>
            </div>
        `;
    }

    /**
     * Show quiz summary
     */
    showQuizSummary(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        const feedbackElement = document.getElementById('quiz-feedback');
        
        let message = '';
        let color = '';
        
        if (percentage >= 80) {
            message = '🎉 Excellent! You mastered this quiz!';
            color = '#22c55e';
        } else if (percentage >= 60) {
            message = '👍 Good job! You have a solid understanding.';
            color = '#3b82f6';
        } else {
            message = '📚 Keep studying! Review the material and try again.';
            color = '#f59e0b';
        }
        
        feedbackElement.innerHTML = `
            <div class="quiz-summary">
                <h3>Quiz Complete!</h3>
                <p style="color: ${color}; font-weight: bold;">${message}</p>
                <p>Score: ${correct}/${total} (${percentage}%)</p>
                <p>Hints used: ${this.hintsUsed}</p>
                <p>Time taken: ${this.formatTimeTaken()}</p>
            </div>
        `;
    }

    /**
     * Update quiz statistics display
     */
    updateQuizStats() {
        const scoreElement = document.querySelector('.quiz-score');
        const hintsElement = document.querySelector('.quiz-hints');
        
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}/${this.currentQuiz.questions.length}`;
        }
        
        if (hintsElement) {
            hintsElement.textContent = `Hints: ${this.hintsUsed}`;
        }
    }

    /**
     * Reset quiz
     */
    resetQuiz() {
        if (confirm('Are you sure you want to reset the quiz? All progress will be lost.')) {
            this.userAnswers = {};
            this.score = 0;
            this.hintsUsed = 0;
            this.startTime = Date.now();
            
            // Clear all selections
            document.querySelectorAll('.quiz-option input').forEach(input => {
                input.checked = false;
            });
            
            // Clear all feedback
            document.querySelectorAll('.question-feedback').forEach(feedback => {
                feedback.innerHTML = '';
            });
            
            // Hide all hints
            document.querySelectorAll('.question-hint').forEach(hint => {
                hint.style.display = 'none';
            });
            
            // Clear summary
            document.getElementById('quiz-feedback').innerHTML = '';
            
            this.saveQuizProgress();
            this.updateQuizStats();
        }
    }

    /**
     * Format time in MM:SS format
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Format time taken for quiz
     */
    formatTimeTaken() {
        if (!this.startTime) return 'N/A';
        
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        return this.formatTime(timeTaken);
    }

    /**
     * Attach quiz event listeners
     */
    attachQuizEventListeners() {
        // Add event listeners for radio buttons
        document.querySelectorAll('.quiz-option input').forEach(input => {
            input.addEventListener('change', (e) => {
                const questionIndex = this.getQuestionIndexFromInput(e.target);
                this.userAnswers[questionIndex] = parseInt(e.target.value);
                this.saveQuizProgress();
            });
        });
    }
}

// Global quiz system instance
let quizSystem;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    quizSystem = new QuizSystem();
});

// Global functions for quiz interaction
window.quizSystem = {
    startQuiz: function(quizData) {
        if (quizSystem) quizSystem.startQuiz(quizData);
    },
    checkAnswers: function() {
        if (quizSystem) quizSystem.checkAnswers();
    },
    showHint: function() {
        if (quizSystem) quizSystem.showHint();
    },
    resetQuiz: function() {
        if (quizSystem) quizSystem.resetQuiz();
    }
};

// CSS for quiz system styling
const quizStyles = `
.quiz-interface {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
}

.quiz-header {
    border-bottom: 2px solid var(--border);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
}

.quiz-header h2 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.quiz-stats {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: var(--muted);
}

.quiz-stats span {
    background: var(--background);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    border: 1px solid var(--border);
}

.quiz-question {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--background);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.quiz-question h3 {
    color: var(--text);
    margin-bottom: 1rem;
}

.question-options {
    margin-bottom: 1rem;
}

.quiz-option {
    display: block;
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    background: white;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quiz-option:hover {
    background: var(--background);
    border-color: var(--primary);
}

.quiz-option input[type="radio"] {
    margin-right: 0.5rem;
}

.question-feedback {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    min-height: 50px;
}

.feedback-correct {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #22c55e;
}

.feedback-incorrect {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #ef4444;
}

.question-hint {
    margin-top: 1rem;
    padding: 1rem;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    color: #92400e;
    display: none;
}

.quiz-controls {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
}

.quiz-summary {
    background: var(--background);
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    margin-top: 1rem;
}

.quiz-summary h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: var(--secondary);
    transform: translateY(-2px);
}

.btn-secondary {
    background: var(--background);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: var(--border);
}

.btn-hint {
    background: #f59e0b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-hint:hover {
    background: #d97706;
}

@media (max-width: 768px) {
    .quiz-stats {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .quiz-controls {
        flex-direction: column;
    }
    
    .btn-primary,
    .btn-secondary,
    .btn-hint {
        width: 100%;
    }
}
`;

// Add quiz styles to head
const styleElement = document.createElement('style');
styleElement.textContent = quizStyles;
document.head.appendChild(styleElement);