import React, { useState } from 'react';
import { 
  ListChecks, 
  User, 
  Settings, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Users, 
  Webhook, 
  Download, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Copy, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CampaignWorkflow({ mode, onCancel, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [importAccordionOpen, setImportAccordionOpen] = useState(true);
  
  // Form/State values
  const [selectedMethod, setSelectedMethod] = useState('linkedin');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [leadList, setLeadList] = useState('My Warm Leads');
  
  // Step 2: Sender Profiles State
  const [selectedSender, setSelectedSender] = useState('sender-1');
  const senderProfiles = [
    {
      id: 'sender-1',
      name: 'John Doe (LinkedIn)',
      type: 'LinkedIn',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      limit: '100 connections / day',
      email: 'john.doe@company.com'
    },
    {
      id: 'sender-2',
      name: 'John Doe (Email)',
      type: 'Email',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      limit: '500 emails / day',
      email: 'johndoe@gmail.com'
    },
    {
      id: 'sender-3',
      name: 'Jane Smith (LinkedIn)',
      type: 'LinkedIn',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Disconnected',
      limit: '0 connections / day',
      email: 'jane.smith@company.com'
    }
  ];

  // Step 3: Settings State
  const [timezone, setTimezone] = useState('America/New_York');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [dailyLimits, setDailyLimits] = useState({ connections: 80, messages: 120, emails: 300 });
  const [tracking, setTracking] = useState({ opens: true, clicks: true, replies: true });

  // Step 4: Final Campaign Stats/Setup State
  const [campaignDetails, setCampaignDetails] = useState({
    name: '',
    channel: 'Email',
    subject: '',
    description: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Validate step 4 details
      const newErrors = {};
      if (!campaignDetails.name.trim()) newErrors.name = 'Campaign Name is required';
      if (!campaignDetails.subject.trim()) newErrors.subject = 'Subject Line is required';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Finish and Save
      onSave({
        id: Date.now().toString(),
        name: campaignDetails.name,
        channel: campaignDetails.channel,
        subject: campaignDetails.subject,
        status: campaignDetails.status,
        description: campaignDetails.description,
        workflowMode: mode,
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        metrics: {
          sent: 0,
          openedRate: 0,
          clickedRate: 0,
        }
      });
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://api.frontendtask.com/v1/webhooks/inbound/usr_9837a2810");
    alert("Webhook URL copied to clipboard!");
  };

  return (
    <div className="space-y-6 select-none animate-fade-in pb-10">
      {/* 1. Horizontal Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-4 shadow-xs flex flex-wrap items-center justify-between gap-y-4">
        {/* Step 1: Define Target Audience */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${
            currentStep === 1 
              ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
              : currentStep > 1 
                ? 'bg-emerald-500/10 text-emerald-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <ListChecks className="size-5" />
          </div>
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${currentStep >= 1 ? 'text-slate-400' : 'text-slate-500'}`}>Step 1</div>
            <div className={`text-sm font-bold ${currentStep === 1 ? 'text-slate-850 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>Define Target Audience</div>
          </div>
        </div>

        <div className="hidden md:block text-slate-300 dark:text-slate-700 font-normal">&gt;</div>

        {/* Step 2: Sender Profiles */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${
            currentStep === 2 
              ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
              : currentStep > 2 
                ? 'bg-emerald-500/10 text-emerald-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <User className="size-5" />
          </div>
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${currentStep >= 2 ? 'text-slate-400' : 'text-slate-500'}`}>Step 2</div>
            <div className={`text-sm font-bold ${currentStep === 2 ? 'text-slate-850 dark:text-slate-100' : 'text-slate-500'}`}>Sender Profiles</div>
          </div>
        </div>

        <div className="hidden md:block text-slate-300 dark:text-slate-700 font-normal">&gt;</div>

        {/* Step 3: Settings */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${
            currentStep === 3 
              ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
              : currentStep > 3 
                ? 'bg-emerald-500/10 text-emerald-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <Settings className="size-5" />
          </div>
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${currentStep >= 3 ? 'text-slate-400' : 'text-slate-500'}`}>Step 3</div>
            <div className={`text-sm font-bold ${currentStep === 3 ? 'text-slate-850 dark:text-slate-100' : 'text-slate-500'}`}>Settings</div>
          </div>
        </div>

        <div className="hidden md:block text-slate-300 dark:text-slate-700 font-normal">&gt;</div>

        {/* Step 4: Stats */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${
            currentStep === 4 
              ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <BarChart3 className="size-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step 4</div>
            <div className={`text-sm font-bold ${currentStep === 4 ? 'text-slate-850 dark:text-slate-100' : 'text-slate-500'}`}>Stats</div>
          </div>
        </div>
      </div>

      {/* 2. Step View Content Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xs min-h-[420px] flex flex-col justify-between">
        
        {/* STEP 1: DEFINE TARGET AUDIENCE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex gap-4">
              {/* Timeline Indicator Column */}
              <div className="flex flex-col items-center">
                <div className="size-5 rounded-full border-2 border-brand-blue bg-white dark:bg-slate-900 flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-brand-blue"></div>
                </div>
                <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-800 mt-2"></div>
              </div>

              {/* Accordion Block */}
              <div className="flex-1 space-y-4">
                <button 
                  onClick={() => setImportAccordionOpen(!importAccordionOpen)}
                  className="w-full flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 text-left font-bold text-slate-800 dark:text-slate-100 hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <span className="text-base font-semibold">Choose Import Method</span>
                  {importAccordionOpen ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                </button>

                {importAccordionOpen && (
                  <div className="space-y-6 pt-2 animate-fade-in">
                    {/* Horizontal 4 Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Method 1: LinkedIn Search */}
                      <div 
                        onClick={() => setSelectedMethod('linkedin')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${
                          selectedMethod === 'linkedin'
                            ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className={`size-9 rounded-lg flex items-center justify-center ${selectedMethod === 'linkedin' ? 'bg-brand-blue text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Linkedin className="size-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150">LinkedIn Search</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-normal leading-relaxed mt-1">
                              (Basic, Sales Nav, Post, Group or Event URL)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Method 2: Upload CSV File */}
                      <div 
                        onClick={() => setSelectedMethod('csv')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${
                          selectedMethod === 'csv'
                            ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className={`size-9 rounded-lg flex items-center justify-center ${selectedMethod === 'csv' ? 'bg-brand-blue text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <FileText className="size-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150">Upload CSV File</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-normal leading-relaxed mt-1">
                              Upload LinkedIn profiles via CSV. <span className="text-brand-blue font-semibold hover:underline">Download Sample</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Method 3: Lead Lists */}
                      <div 
                        onClick={() => setSelectedMethod('list')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${
                          selectedMethod === 'list'
                            ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className={`size-9 rounded-lg flex items-center justify-center ${selectedMethod === 'list' ? 'bg-brand-blue text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Users className="size-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150">Lead Lists</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-normal leading-relaxed mt-1">
                              Use Lead Finder to find audience.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Method 4: Inbound Webhook */}
                      <div 
                        onClick={() => setSelectedMethod('webhook')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${
                          selectedMethod === 'webhook'
                            ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className={`size-9 rounded-lg flex items-center justify-center ${selectedMethod === 'webhook' ? 'bg-brand-blue text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Webhook className="size-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150">Inbound Webhook</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-normal leading-relaxed mt-1">
                              Sync leads from zapier, n8n make in real time
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Method Details Pane */}
                    <div className="bg-[#F8F9FA] dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-5 mt-4 space-y-4">
                      {selectedMethod === 'linkedin' && (
                        <div className="space-y-3">
                          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-150">Enter LinkedIn Search URL</h5>
                          <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                            Paste your LinkedIn Search result URL (supports Sales Navigator Search, Basic Search, Post Likers URL, or Event Attendees URL).
                          </p>
                          <input 
                            type="text" 
                            placeholder="https://www.linkedin.com/sales/search/people?query=..." 
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                          />
                        </div>
                      )}

                      {selectedMethod === 'csv' && (
                        <div className="space-y-3">
                          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-150 font-semibold">Upload CSV File</h5>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            Upload a spreadsheet containing a column labeled <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">profileUrl</code> or <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">linkedinUrl</code>.
                          </p>
                          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700/60 rounded-xl p-8 text-center bg-white dark:bg-slate-900 hover:border-brand-blue/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer">
                            <Download className="size-7 text-slate-300 dark:text-slate-650" />
                            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                              {csvFile ? csvFile.name : "Drag & drop files or Browse"}
                            </div>
                            <div className="text-[10px] text-slate-400">Supported formats: .csv (Max 15MB)</div>
                            <input 
                              type="file" 
                              accept=".csv"
                              onChange={(e) => setCsvFile(e.target.files[0])}
                              className="hidden" 
                              id="csv-upload-field"
                            />
                            <label htmlFor="csv-upload-field" className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                              Select File
                            </label>
                          </div>
                        </div>
                      )}

                      {selectedMethod === 'list' && (
                        <div className="space-y-3">
                          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-150">Select Lead List</h5>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            Select one of your pre-defined contact lists from your system folders.
                          </p>
                          <select 
                            value={leadList} 
                            onChange={(e) => setLeadList(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                          >
                            <option value="My Warm Leads">My Warm Leads (240 prospects)</option>
                            <option value="SaaS Founders Q2">SaaS Founders Q2 (1,248 prospects)</option>
                            <option value="Angel Investors list">Angel Investors list (87 prospects)</option>
                            <option value="Cold Outbound List 5">Cold Outbound List 5 (3,000 prospects)</option>
                          </select>
                        </div>
                      )}

                      {selectedMethod === 'webhook' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold text-slate-800 dark:text-slate-150">Inbound Webhook Url</h5>
                            <button 
                              onClick={copyWebhookUrl}
                              className="flex items-center gap-1 text-xs text-brand-blue hover:text-brand-blue-hover font-semibold cursor-pointer"
                            >
                              <Copy className="size-3.5" />
                              Copy URL
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                            Send JSON payloads to this address. Ensure you specify fields such as <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">email</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">linkedinUrl</code>.
                          </p>
                          <div className="font-mono text-xs p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-slate-500 dark:text-slate-400 break-all select-all select-none">
                            https://api.frontendtask.com/v1/webhooks/inbound/usr_9837a2810
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SENDER PROFILES */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Choose Sender Profile</h3>
              <p className="text-xs text-slate-455 dark:text-slate-450 font-normal mt-1">Select the sender profile to dispatch connection requests, messages, and emails.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {senderProfiles.map((sender) => {
                const isSelected = selectedSender === sender.id;
                const isDisconnected = sender.status === 'Disconnected';
                return (
                  <div
                    key={sender.id}
                    onClick={() => !isDisconnected && setSelectedSender(sender.id)}
                    className={`border-2 rounded-xl p-5 relative transition-all flex flex-col justify-between gap-4 ${
                      isDisconnected 
                        ? 'border-slate-200 dark:border-slate-800 opacity-55 cursor-not-allowed bg-slate-50/20' 
                        : isSelected
                          ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs cursor-pointer'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-855 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={sender.avatar} alt={sender.name} className="size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                          <span className={`absolute bottom-0 right-0 size-3 border-2 border-white dark:border-slate-950 rounded-full ${
                            isDisconnected ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150 leading-tight">{sender.name}</h4>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            sender.type === 'LinkedIn' ? 'text-blue-500' : 'text-emerald-500'
                          }`}>{sender.type}</span>
                        </div>
                      </div>
                      
                      {isSelected && !isDisconnected && (
                        <div className="size-5 rounded-full bg-brand-blue flex items-center justify-center text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">
                        Email: <span className="font-semibold text-slate-600 dark:text-slate-350">{sender.email}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">
                        Sending Limit: <span className="font-semibold text-slate-600 dark:text-slate-350">{sender.limit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-455 bg-[#F4F5F8] dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800">
              <AlertCircle className="size-4.5 text-brand-blue flex-shrink-0" />
              <span>We recommend connecting multiple channels (LinkedIn + Email) for higher deliverability and reach.</span>
            </div>
          </div>
        )}

        {/* STEP 3: SETTINGS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Campaign Sending Schedule & Limits</h3>
              <p className="text-xs text-slate-455 dark:text-slate-450 font-normal mt-1">Configure active times, weekly schedules, daily volume constraints, and tracking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Settings Panel */}
              <div className="space-y-5">
                {/* Timezone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Sending Timezone</label>
                  <select 
                    value={timezone} 
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  >
                    <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                    <option value="Europe/London">(GMT+00:00) London, Dublin, Edinburgh</option>
                    <option value="Asia/Kolkata">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                  </select>
                </div>

                {/* Sending Days */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Active Sending Days</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const isActive = selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-brand-blue text-white shadow-xs' 
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700/60 hover:border-slate-350'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Start Time</label>
                    <input type="time" defaultValue="09:00" className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">End Time</label>
                    <input type="time" defaultValue="17:00" className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue" />
                  </div>
                </div>

              </div>

              {/* Right Settings Panel */}
              <div className="space-y-5">
                {/* Daily Limits */}
                <div className="space-y-4 bg-slate-50/50 dark:bg-slate-800/20 p-5 border border-slate-150 dark:border-slate-800/80 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Daily Outreach Limits</h4>
                  
                  {/* limit 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">LinkedIn Connections</span>
                      <span className="text-brand-blue">{dailyLimits.connections} / day</span>
                    </div>
                    <input 
                      type="range" min="10" max="150" 
                      value={dailyLimits.connections}
                      onChange={(e) => setDailyLimits({...dailyLimits, connections: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-855 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    />
                  </div>

                  {/* limit 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Email Dispatch Volume</span>
                      <span className="text-brand-blue">{dailyLimits.emails} / day</span>
                    </div>
                    <input 
                      type="range" min="50" max="1000" 
                      value={dailyLimits.emails}
                      onChange={(e) => setDailyLimits({...dailyLimits, emails: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-855 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    />
                  </div>
                </div>

                {/* Tracking preferences */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Tracking Preferences</label>
                  
                  {/* Track 1 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={tracking.opens}
                      onChange={(e) => setTracking({...tracking, opens: e.target.checked})}
                      className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30 size-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-655 dark:text-slate-400 font-medium">Track email open rates</span>
                  </label>

                  {/* Track 2 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={tracking.clicks}
                      onChange={(e) => setTracking({...tracking, clicks: e.target.checked})}
                      className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30 size-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-655 dark:text-slate-400 font-medium">Track email link click clicks</span>
                  </label>

                  {/* Track 3 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={tracking.replies}
                      onChange={(e) => setTracking({...tracking, replies: e.target.checked})}
                      className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30 size-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-655 dark:text-slate-400 font-medium">Stop sending sequence when reply is received</span>
                  </label>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* STEP 4: STATS / REVIEW & LAUNCH */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Review & Launch Campaign</h3>
              <p className="text-xs text-slate-455 dark:text-slate-450 font-normal mt-1">Provide a name, subject line, and verify final details before launching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Form Input Column */}
              <div className="md:col-span-2 space-y-4">
                
                {/* Campaign Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Campaign Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Q3 Enterprise Outreach" 
                    value={campaignDetails.name}
                    onChange={(e) => {
                      setCampaignDetails({...campaignDetails, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${
                      errors.name ? 'border-rose-500 ring-2 ring-rose-500/25' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Channel & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Channel Type</label>
                    <select 
                      value={campaignDetails.channel} 
                      onChange={(e) => setCampaignDetails({...campaignDetails, channel: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden"
                    >
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Social">Social / LinkedIn</option>
                      <option value="Push">Push Notifications</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Initial Status</label>
                    <select 
                      value={campaignDetails.status} 
                      onChange={(e) => setCampaignDetails({...campaignDetails, status: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Subject Line */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Subject Line</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Quick question regarding your pipeline..." 
                    value={campaignDetails.subject}
                    onChange={(e) => {
                      setCampaignDetails({...campaignDetails, subject: e.target.value});
                      if (errors.subject) setErrors({...errors, subject: ''});
                    }}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${
                      errors.subject ? 'border-rose-500 ring-2 ring-rose-500/25' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.subject && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.subject}</p>}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Campaign Description</label>
                  <textarea 
                    placeholder="Brief description of the workflow goal..." 
                    value={campaignDetails.description}
                    onChange={(e) => setCampaignDetails({...campaignDetails, description: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden"
                  />
                </div>

              </div>

              {/* Sidebar Summary Card */}
              <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-150 dark:border-slate-800/80 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-200/50 dark:border-slate-800">Campaign Summary</h4>
                
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    Workflow Mode: <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mt-0.5 capitalize">{mode}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    Import Method: <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mt-0.5 uppercase">{selectedMethod}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    Sender Account: <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mt-0.5">John Doe</span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    Schedule Active: <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mt-0.5">{selectedDays.join(', ')} (9AM - 5PM)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    Daily Capacity: <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mt-0.5">{dailyLimits.connections} Con / {dailyLimits.emails} Emails</span>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-md border border-emerald-100 dark:border-emerald-900/40">
                  <Sparkles className="size-4 flex-shrink-0" />
                  <span>Ready to deploy and run automatically!</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* footer action buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
          <button
            type="button"
            onClick={handleBackStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>{currentStep === 4 ? 'Launch Campaign' : 'Next'}</span>
            <ArrowRight className="size-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
