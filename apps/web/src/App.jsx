import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [searchQuery, setSearchQuery] = useState('AI engineers, CTOs, and technical decision makers focused on speech-to-text, voice AI, and conversational AI applications. They build voice agents, meeting transcription tools, phone support automation, and sales call analysis tools.');
  const [criteria, setCriteria] = useState([
    'currently employed as an ai engineer, cto, vp of engineering, or technical decision maker',
    'professional focus on speech-to-text, voice ai, conversational ai, or audio processing',
    'builds or maintains products involving: ai voice agents, meeting transcription, phone support automation, or voice-enabled applications'
  ]);
  const [leadCount, setLeadCount] = useState(5);
  const [emailType, setEmailType] = useState('cold_outreach');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [emails, setEmails] = useState({});
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('idle'); // idle, generating-leads, generating-emails, complete
  const [generatingEmailForIndex, setGeneratingEmailForIndex] = useState(null);

  const addCriterion = () => {
    setCriteria([...criteria, '']);
  };

  const removeCriterion = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateCriterion = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  const handleGenerateLeads = async () => {
    setLoading(true);
    setError(null);
    setCurrentStep('generating-leads');
    setLeads([]);
    setEmails([]);

    try {
      const response = await fetch(`${API_URL}/api/generate-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          criteria: criteria.filter(c => c.trim() !== ''),
          leadCount
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setLeads(data.leads);
      setCurrentStep('leads-generated');
    } catch (err) {
      setError(err.message);
      setCurrentStep('idle');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEmailForLead = async (lead, index) => {
    setGeneratingEmailForIndex(index);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead, emailType })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Store email for this specific lead
      setEmails(prev => ({
        ...prev,
        [index]: {
          lead: {
            name: lead.name,
            email: lead.email,
            title: lead.title,
            company: lead.company?.name,
            linkedin: lead.linkedin?.url,
          },
          email: data.email
        }
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setGeneratingEmailForIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Gladia Lead Generation</h1>
          <p className="text-gray-600">Generate targeted leads and personalized emails with AI</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Search Criteria Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎯 Search Criteria</h2>

          {/* Search Query */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Query
            </label>
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your target audience..."
            />
          </div>

          {/* Criteria List */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Criteria
            </label>
            {criteria.map((criterion, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={criterion}
                  onChange={(e) => updateCriterion(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., works at a company with 10-1000 employees"
                />
                <button
                  onClick={() => removeCriterion(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addCriterion}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              + Add Criterion
            </button>
          </div>

          {/* Lead Count & Email Type */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Leads
              </label>
              <input
                type="number"
                value={leadCount}
                onChange={(e) => setLeadCount(parseInt(e.target.value))}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Type
              </label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cold_outreach">Cold Outreach</option>
                <option value="follow_up">Follow Up</option>
                <option value="value_add">Value Add</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateLeads}
            disabled={loading || !searchQuery.trim()}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading && currentStep === 'generating-leads' ? '🔍 Generating Leads...' : '🚀 Generate Leads'}
          </button>
        </div>

        {/* Leads Results */}
        {leads.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📊 Found {leads.length} Leads
            </h2>

            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{lead.name}</h3>
                      <p className="text-gray-600">{lead.title} at {lead.company.name}</p>
                      {lead.email && <p className="text-blue-600 text-sm">{lead.email}</p>}
                    </div>
                    <div className="flex gap-2">
                      {lead.linkedin && (
                        <a href={lead.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                          LinkedIn
                        </a>
                      )}
                      {lead.twitter && (
                        <a href={lead.twitter.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                          Twitter
                        </a>
                      )}
                      {lead.github && (
                        <a href={lead.github.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline text-sm">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{lead.summary.substring(0, 200)}...</p>

                  {/* Generate Email Button */}
                  {!emails[index] ? (
                    <button
                      onClick={() => handleGenerateEmailForLead(lead, index)}
                      disabled={generatingEmailForIndex === index}
                      className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {generatingEmailForIndex === index ? '✍️ Generating Email...' : '✉️ Generate Email'}
                    </button>
                  ) : (
                    <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
                      <div className="mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Subject:</p>
                        <p className="font-semibold text-gray-900 text-sm">{emails[index].email.subject}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Body:</p>
                        <div className="text-gray-800 text-sm whitespace-pre-wrap bg-white p-3 rounded border border-gray-200 max-h-64 overflow-y-auto">
                          {emails[index].email.body}
                        </div>
                      </div>
                      <button
                        onClick={() => handleGenerateEmailForLead(lead, index)}
                        disabled={generatingEmailForIndex === index}
                        className="mt-3 w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                      >
                        {generatingEmailForIndex === index ? '✍️ Regenerating...' : '🔄 Regenerate Email'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
