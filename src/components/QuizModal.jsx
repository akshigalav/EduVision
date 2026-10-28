import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Flame, 
  BookOpen, 
  HelpCircle,
  Trophy,
  BrainCircuit
} from 'lucide-react';
import { getQuizForTopic } from '../data/quizData';
import './QuizModal.css';

/**
 * Procedural Audio Chimes using Web Audio API
 */
function playQuizAudio(type = 'correct') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260.0, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(180.0, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'victory') {
      // Fanfare arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        noteGain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(ctx.currentTime + idx * 0.1);
        noteOsc.stop(ctx.currentTime + idx * 0.1 + 0.4);
      });
    }
  } catch {
    // Audio context may require prior user interaction
  }
}

export default function QuizModal({ isOpen, onClose, topicId, topicTitle }) {
  const navigate = useNavigate();
  const questions = getQuizForTopic(topicId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Reset quiz state whenever modal opens or topic changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setStreak(0);
      setHighestStreak(0);
      setUserAnswers([]);
      setQuizFinished(false);
    }
  }, [isOpen, topicId]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      playQuizAudio('correct');
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setHighestStreak(h => Math.max(h, newStreak));
        return newStreak;
      });
    } else {
      playQuizAudio('wrong');
      setStreak(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQ.question,
        selectedOption: index,
        correctIndex: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation,
        options: currentQ.options
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      playQuizAudio('victory');

      // Persist score to local storage
      try {
        const history = JSON.parse(localStorage.getItem('eduvision_quiz_history') || '{}');
        const prevBest = history[topicId]?.score || 0;
        history[topicId] = {
          score: Math.max(prevBest, score + (selectedOption === currentQ.correctIndex ? 1 : 0)),
          total: questions.length,
          lastCompleted: new Date().toISOString()
        };
        localStorage.setItem('eduvision_quiz_history', JSON.stringify(history));
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  const handleAskAIAboutMistakes = () => {
    const missedQuestions = userAnswers.filter(a => !a.isCorrect);
    const query = missedQuestions.length > 0
      ? `I missed this question on ${topicTitle}: "${missedQuestions[0].question}". Can you explain why the correct answer is "${missedQuestions[0].options[missedQuestions[0].correctIndex]}"?`
      : `I scored 100% on the ${topicTitle} quiz! Can you quiz me on more advanced concepts?`;
    onClose();
    navigate(`/chat?q=${encodeURIComponent(query)}`);
  };

  // Compute final score & badge
  const finalPercentage = Math.round((score / questions.length) * 100);
  const getBadgeDetails = () => {
    if (finalPercentage === 100) {
      return { title: 'Mastery Grandmaster', color: '#f59e0b', icon: <Trophy size={36} color="#f59e0b" /> };
    } else if (finalPercentage >= 80) {
      return { title: 'Advanced Scholar', color: '#10b981', icon: <Award size={36} color="#10b981" /> };
    } else if (finalPercentage >= 60) {
      return { title: 'Proficient Explorer', color: '#38bdf8', icon: <Sparkles size={36} color="#38bdf8" /> };
    } else {
      return { title: 'Conceptual Apprentice', color: '#ec4899', icon: <BrainCircuit size={36} color="#ec4899" /> };
    }
  };
  const badge = getBadgeDetails();

  return (
    <div className="quiz-modal-backdrop" onClick={onClose}>
      <div className="quiz-modal-container glass-card" onClick={e => e.stopPropagation()}>
        {/* Top Header */}
        <div className="quiz-modal-header">
          <div className="quiz-header-left">
            <span className="quiz-topic-badge">
              <BookOpen size={13} />
              <span>{topicTitle}</span>
            </span>
            <span className="quiz-session-title">Knowledge Assessment</span>
          </div>

          <div className="quiz-header-right">
            {streak > 1 && !quizFinished && (
              <span className="quiz-streak-pill">
                <Flame size={14} color="#f97316" />
                <span>{streak} Streak!</span>
              </span>
            )}
            <button className="quiz-close-btn" onClick={onClose} title="Close Quiz">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress Bar (During active quiz) */}
        {!quizFinished && (
          <div className="quiz-progress-track">
            <div 
              className="quiz-progress-fill" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="quiz-modal-body">
          {!quizFinished ? (
            /* =========================================================================
               ACTIVE QUESTION VIEW
               ========================================================================= */
            <div className="active-question-wrapper">
              <div className="question-meta-row">
                <span className="question-stepper-text">
                  Question <strong>{currentIndex + 1}</strong> of {questions.length}
                </span>

                <div className="question-badges-group">
                  <span className={`difficulty-pill pill-${currentQ.difficulty.toLowerCase()}`}>
                    {currentQ.difficulty}
                  </span>
                  <span className="concept-pill">
                    {currentQ.relatedConcept}
                  </span>
                </div>
              </div>

              <h3 className="question-text">{currentQ.question}</h3>

              {/* Options List */}
              <div className="options-grid">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionClass = 'option-btn';
                  if (isAnswered) {
                    if (isCorrect) optionClass += ' correct';
                    else if (isSelected && !isCorrect) optionClass += ' wrong';
                    else optionClass += ' disabled';
                  } else if (isSelected) {
                    optionClass += ' selected';
                  }

                  const letterTag = String.fromCharCode(65 + idx); // A, B, C, D

                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                    >
                      <span className="option-letter">{letterTag}</span>
                      <span className="option-content">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 size={18} className="option-status-icon correct-icon" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle size={18} className="option-status-icon wrong-icon" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Animated Explanation Drawer (Revealed After Answering) */}
              {isAnswered && (
                <div className="explanation-card">
                  <div className="explanation-header">
                    <div className="explanation-title-row">
                      <Sparkles size={16} color="#6366f1" />
                      <h4>Scientific Explanation:</h4>
                    </div>
                    <button
                      className="ask-ai-inline-btn"
                      onClick={() => {
                        onClose();
                        navigate(`/chat?q=${encodeURIComponent(`Explain this concept in ${topicTitle}: "${currentQ.question}"`)}`);
                      }}
                      title="Ask AI for deeper insights"
                    >
                      <Bot size={13} />
                      <span>Ask AI Tutor</span>
                    </button>
                  </div>
                  <p className="explanation-text">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* =========================================================================
               QUIZ COMPLETED RESULTS VIEW
               ========================================================================= */
            <div className="quiz-results-container">
              <div className="results-badge-hero">
                <div className="hero-icon-wrap" style={{ borderColor: `${badge.color}60`, boxShadow: `0 0 24px ${badge.color}40` }}>
                  {badge.icon}
                </div>
                <h3 className="results-tier-title" style={{ color: badge.color }}>
                  {badge.title}
                </h3>
                <span className="results-subtitle">
                  Completed {topicTitle} Curriculum Assessment
                </span>
              </div>

              {/* Score Display Card */}
              <div className="results-score-card">
                <div className="score-main-metric">
                  <span className="score-big">{score}</span>
                  <span className="score-slash">/</span>
                  <span className="score-total">{questions.length}</span>
                </div>
                <div className="score-percent-badge" style={{ backgroundColor: `${badge.color}25`, color: badge.color }}>
                  {finalPercentage}% Accuracy
                </div>
                <span className="score-feedback-text">
                  {finalPercentage === 100 
                    ? 'Flawless conceptual mastery! You demonstrated complete command of all physiological/physical principles.' 
                    : finalPercentage >= 80 
                    ? 'Excellent performance! You possess a strong analytical grasp of this subject.' 
                    : 'Good attempt! Review the conceptual points below or ask EduVision AI to reinforce key ideas.'}
                </span>
              </div>

              {/* Question Review Accordion */}
              <div className="results-review-section">
                <h4 className="review-heading">Question Analysis & Mastery Review:</h4>
                <div className="review-list">
                  {userAnswers.map((item, idx) => (
                    <div key={idx} className={`review-item-card ${item.isCorrect ? 'pass' : 'fail'}`}>
                      <div className="review-item-top">
                        <div className="review-item-status">
                          {item.isCorrect ? (
                            <CheckCircle2 size={16} color="#10b981" />
                          ) : (
                            <XCircle size={16} color="#ef4444" />
                          )}
                          <span className="review-q-num">Q{idx + 1}</span>
                        </div>
                        <span className="review-item-title">{item.question}</span>
                      </div>

                      {!item.isCorrect && (
                        <div className="review-correction-row">
                          <span className="correction-label">Correct Answer:</span>
                          <span className="correction-text">{item.options[item.correctIndex]}</span>
                        </div>
                      )}

                      <p className="review-item-explanation">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="quiz-modal-footer">
          {!quizFinished ? (
            <div className="footer-quiz-active">
              <span className="score-counter-text">
                Current Score: <strong>{score}</strong> / {questions.length}
              </span>

              {isAnswered && (
                <button className="btn btn-primary next-q-btn" onClick={handleNextQuestion}>
                  <span>{currentIndex + 1 === questions.length ? 'Complete Quiz' : 'Next Question'}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className="footer-quiz-results">
              <button className="btn btn-secondary" onClick={handleRestartQuiz}>
                <RotateCcw size={15} />
                <span>Retake Quiz</span>
              </button>

              <button className="btn btn-primary" onClick={handleAskAIAboutMistakes} style={{ backgroundColor: '#10b981' }}>
                <Bot size={15} />
                <span>{score === questions.length ? 'Explore Advanced Doubts' : 'Review Weak Areas with AI'}</span>
              </button>

              <button className="btn btn-secondary" onClick={onClose}>
                Back to 3D Lab
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
