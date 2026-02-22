import React, { useState } from 'react';
import CodeLab from './CodeLab';
import './CodeLabPage.css';

// بيانات التحديات
const challengesData = [
    {
        id: 1,
        title: "التحدي 1: Hello, World!",
        description: "اكتب برنامج يطبع 'Hello, world!'",
        sample_input: "",
        sample_output: "Hello, world!",
        difficulty: "beginner"
    },
    {
        id: 2,
        title: "التحدي 2: الجمع",
        description: "اكتب برنامج ياخد رقمين من المستخدم ويطبع مجموعهما",
        sample_input: "5\n3",
        sample_output: "8",
        difficulty: "beginner"
    },
    {
        id: 3,
        title: "التحدي 3: التحقق من الزوجي",
        description: "اكتب برنامج يتحقق إذا كان الرقم المدخل زوجي أم فردي",
        sample_input: "4",
        sample_output: "even",
        difficulty: "beginner"
    },
    {
        id: 4,
        title: "التحدي 4: التحقق من الفردي",
        description: "اكتب برنامج يتحقق إذا كان الرقم المدخل فردي",
        sample_input: "7",
        sample_output: "odd",
        difficulty: "beginner"
    },
    {
        id: 5,
        title: "التحدي 5: طباعة اسمك",
        description: "اكتب برنامج ياخد اسم المستخدم ويطبع 'Hello, [الاسم]!'",
        sample_input: "Ahmed",
        sample_output: "Hello, Ahmed!",
        difficulty: "beginner"
    }
];

const CodeLabPage = () => {

    const [selectedChallenge, setSelectedChallenge] = useState(challengesData[0]);
    const [showChallenges, setShowChallenges] = useState(true);

    return (
        <div className="codelab-page">

            {/* ===== الهيدر ===== */}
            <div className="codelab-header">
                <div className="header-content">

                    {/* زر الرجوع */}
                    <div 
                        className="close-btn"
                        onClick={() => window.location.href = "/html.html"}
                    >
                        ←
                    </div>

                    <div>
                        <h1>🧪 Code Lab - معمل البرمجة</h1>
                        <p>تدرب على البرمجة وحل التحديات واحصل على النتائج فوراً</p>
                    </div>

                </div>
            </div>

            <div className="codelab-layout">

                {showChallenges && (
                    <div className="challenges-sidebar">

                        <div className="sidebar-header">
                            <h3>📋 قائمة التحديات</h3>
                            <button 
                                className="close-sidebar"
                                onClick={() => setShowChallenges(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="challenges-list">
                            {challengesData.map(challenge => (
                                <div
                                    key={challenge.id}
                                    className={`challenge-item ${selectedChallenge.id === challenge.id ? 'active' : ''}`}
                                    onClick={() => setSelectedChallenge(challenge)}
                                >
                                    <div className="challenge-item-title">
                                        {challenge.title}
                                    </div>

                                    <div className="challenge-item-meta">
                                        <span className={`difficulty ${challenge.difficulty}`}>
                                            {challenge.difficulty === 'beginner' && 'مبتدئ'}
                                            {challenge.difficulty === 'intermediate' && 'متوسط'}
                                            {challenge.difficulty === 'advanced' && 'متقدم'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {!showChallenges && (
                    <button 
                        className="show-sidebar-btn"
                        onClick={() => setShowChallenges(true)}
                    >
                        📋 عرض التحديات
                    </button>
                )}

                <div className="codelab-main">
                    <CodeLab challenge={selectedChallenge} />
                </div>

            </div>
        </div>
    );
};

export default CodeLabPage;