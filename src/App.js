import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  function isLanguageRelated(question) {
    const languageKeywords = ["agriculture", "plant", "plant disease", "soil", "medicine", "crops"];
    const lowerCaseQuestion = question.toLowerCase();
    return languageKeywords.some(keyword => lowerCaseQuestion.includes(keyword));
  }

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    if (!isLanguageRelated(question)) {
      setAnswer("Sorry, I can only answer questions related to language learning.");
      setGeneratingAnswer(false);
      return;
    }

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCyUlS0sOxu-cODLirQ9YLQPWAJirrezkE",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  
  return (
    <div style={{
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition: 'background-color 0.5s ease',
    }} className="h-screen flex justify-center items-center">
      <div className="w-full md:w-2/3 text-center">
        <form
          onSubmit={generateAnswer}
          className="rounded bg-gray-50 py-2 shadow-lg"
        >
          <a href="" target="_blank">
            <h1 className="text-3xl text-gray-800">UZHAVAN🌿</h1>
            <p className="text-xs text-gray-600">The best fertilizer is the farmer's footsteps.</p>
          </a>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3 focus:outline-none focus:ring focus:border-blue-300"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything related to language"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            Generate word
          </button>
        </form>
        <div className="rounded bg-gray-50 my-1 shadow-lg">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;