import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface QAComponentProps {
  documentId: string;
  documentContent: string;
}

const QAComponent: React.FC<QAComponentProps> = ({ documentId, documentContent }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{question: string, answer: string}>>([]);

  const askQuestion = async () => {
    const trimmedQuestion = question.trim();
    
    // Validation
    if (!trimmedQuestion || trimmedQuestion.length < 3) {
      toast.error('Please enter a question (at least 3 characters)', {
        duration: 3000,
        position: 'top-right'
      });
      return;
    }

    if (!documentContent || documentContent.length < 50) {
      toast.error('Document has no text content to answer questions', {
        duration: 4000,
        position: 'top-right'
      });
      return;
    }

    setIsLoading(true);
    setAnswer(''); // Clear previous answer

    try {
      console.log('Asking question:', trimmedQuestion);
      
      const response = await fetch(
        `http://localhost:5000/api/documents/${documentId}/ask`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: trimmedQuestion }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      if (!data.answer) {
        throw new Error("No answer received from server");
      }

      // Set answer and add to history
      setAnswer(data.answer);
      setQaHistory(prev => [{
        question: trimmedQuestion,
        answer: data.answer
      }, ...prev]); // Add to beginning
      
      // Clear input
      setQuestion('');
      
      console.log('Question answered successfully');

    } catch (error: any) {
      console.error("Q&A error:", error);
      toast.error(error.message || "Couldn't get an answer. Please try again.", {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      askQuestion();
    }
  };

  const handleCopyAnswer = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!', {
      duration: 1500,
      position: 'bottom-right',
      style: {
        background: '#10B981',
        color: '#fff',
        fontWeight: 'bold',
        marginRight: '30px',
      },
    });
  };

  const handleSampleQuestion = (sampleQuestion: string) => {
    setQuestion(sampleQuestion);
    // Auto-focus would be nice but not required
  };

  return (
    <div className="space-y-6">
      {/* Question Input Area */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Ask a question about this document
        </label>
        
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., What are the main points? Who is this for? What are the key dates?"
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
            rows={3}
            disabled={isLoading}
          />
          
          <button
            onClick={askQuestion}
            disabled={isLoading || !question.trim()}
            className="absolute right-3 bottom-3 p-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-colors"
            title="Ask question"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-lg">send</span>
            )}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">info</span>
          Press Enter to ask, Shift+Enter for new line
        </div>
      </div>

      {/* Current Answer Display */}
      {answer && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-1">
              <span className="material-symbols-outlined text-green-600">lightbulb</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold text-green-800">Answer</h4>
                <button
                  onClick={() => handleCopyAnswer(answer)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                  title="Copy answer"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap text-sm">{answer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Questions */}
      {qaHistory.length === 0 && !answer && (
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              "What is this document about?",
              "What are the main points?",
              "Who is the target audience?",
              "What problem does it solve?",
              "What are the key recommendations?"
            ].map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleQuestion(sample)}
                className="text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q&A History */}
      {qaHistory.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Previous Questions</h4>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {qaHistory.length} asked
            </span>
          </div>
          
          <div className="space-y-3">
            {qaHistory.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="material-symbols-outlined text-gray-500 text-sm mt-0.5">question_mark</span>
                  <p className="text-sm font-medium text-gray-900">{item.question}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">lightbulb</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{item.answer}</p>
                    <button
                      onClick={() => handleCopyAnswer(item.answer)}
                      className="mt-1 text-xs text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QAComponent;