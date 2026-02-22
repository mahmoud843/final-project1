import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeLab.css';

const CodeLab = ({ challenge }) => {
    const [code, setCode] = useState(`# اكتب كود Python هنا
print("Hello, world!")`);
    const [output, setOutput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [error, setError] = useState('');

    const defaultChallenge = {
        title: "Hello, World!",
        description: "اكتب برنامج يطبع 'Hello, world!'",
        sample_output: "Hello, world!",
        difficulty: "beginner"
    };

    const currentChallenge = challenge || defaultChallenge;

    const checkCode = () => {
        setOutput('');
        setIsCorrect(null);
        setError('');

        try {
            const printMatch = code.match(/print\s*\(\s*["']([^"']+)["']\s*\)/);
            if (printMatch) {
                const printedText = printMatch[1];
                setOutput(`🔍 تم العثور على: "${printedText}"`);

                if (printedText === currentChallenge.sample_output) {
                    setIsCorrect(true);
                } else {
                    setIsCorrect(false);
                    setError(`❌ خطأ: تطبع "${printedText}" ولكن المطلوب "${currentChallenge.sample_output}"`);
                }
            } else {
                setOutput('⚠️ لم أجد أمر print');
                setIsCorrect(false);
                setError('❌ لازم تستخدم print');
            }
        } catch (err) {
            setOutput('❌ حدث خطأ');
            setIsCorrect(false);
        }
    };

    return (
        <div className="codelab-container">
            <div className="challenge-section">
                <h2>{currentChallenge.title}</h2>
                <p>{currentChallenge.description}</p>
                <div className="sample-box">
                    <h4>📤 المطلوب طباعته:</h4>
                    <pre>{currentChallenge.sample_output}</pre>
                </div>
                <span className="difficulty-badge">
                    {currentChallenge.difficulty === 'beginner' ? 'مبتدئ' : currentChallenge.difficulty}
                </span>
            </div>

            <div className="editor-section">
                <div className="editor-header">
                    <h3>✏️ اكتب الكود هنا</h3>
                    <button onClick={checkCode} className="run-button">▶ تشغيل</button>
                </div>
                <Editor
                    height="250px"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val)}
                />
            </div>

            <div className="output-section">
                <h3>📊 النتيجة</h3>
                <div className="output-box">
                    {isCorrect === true && <div className="correct">✅ صحيح! أحسنت</div>}
                    {isCorrect === false && <div className="wrong">❌ خطأ</div>}
                    {error && <div className="error-message">{error}</div>}
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default CodeLab;