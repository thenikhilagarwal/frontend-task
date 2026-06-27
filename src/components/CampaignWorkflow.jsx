import { useState } from 'react';
import LookalikeModal from './LookalikeModal';
import {
  ListChecks,
  User,
  Settings,
  BarChart3,
  ChevronDown,
  Info,
  ChevronUp,
  FileText,
  Users,
  Webhook,
  ChevronRight,
  Upload,
  Check,
  Sparkles,
  AlertCircle,
  Copy,
  ArrowLeft,
  CloudDownload
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

export default function CampaignWorkflow({
  mode,
  onCancel,
  onSave,
  lookalikeLists = [],
  selectedLookalikeListId = null,
  setIsLookalikeModalOpen
}) {
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
    <div className="space-y-6 select-none animate-fade-in">
      {/* 1. Horizontal Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md px-6 py-4 shadow-xs flex flex-wrap items-center gap-x-5  xl:gap-x-10 gap-y-4">
        {/* Step 1: Define Target Audience */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 1
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : currentStep > 1
              ? 'bg-[#D0DCFF] text-primary'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
            <ListChecks className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 1 ? 'text-[#444050] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Define Target Audience</div>
        </div>

        <ChevronRight className="size-5 text-[#6E6B7B]" />

        {/* Step 2: Sender Profiles */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 2
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : currentStep > 2
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-[#E8E8E8] dark:bg-slate-800 text-slate-400'
            }`}>
            <User className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 1 ? 'text-[#5E5873] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Sender Profiles</div>
        </div>

        <ChevronRight className="size-5 text-[#6E6B7B]" />

        {/* Step 3: Settings */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 3
            ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
            : currentStep > 3
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
            <Settings className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 1 ? 'text-[#5E5873] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Settings</div>
        </div>

        <ChevronRight className="size-5 text-[#6E6B7B]" />

        {/* Step 4: Stats */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 4
            ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
            <BarChart3 className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 1 ? 'text-[#5E5873] dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>Stats</div>
        </div>
      </div>

      {/* 2. Step View Content Container */}
      <div className="flex flex-col justify-between">

        {/* STEP 1: DEFINE TARGET AUDIENCE */}
        {currentStep === 1 && (
          <div className="relative pl-8 space-y-6">
            {/* Timeline Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#EAEFFF] dark:bg-slate-850"></div>

            {/* Sub-step 1: Choose Import Method */}
            <div className="relative space-y-4">
              {/* Node 1 */}
              <div className="absolute -left-8 top-2 size-5 rounded-full bg-emerald-500 flex items-center justify-center text-white z-10">
                <Check className="size-3 stroke-[3]" />
              </div>

              {/* Header Bar */}
              <button
                type="button"
                onClick={() => setImportAccordionOpen(!importAccordionOpen)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md text-left font-bold text-slate-800 dark:text-slate-100 hover:text-brand-blue transition-all cursor-pointer"
              >
                <span className="text-base font-medium text-[#444050] dark:text-slate-200">Choose Import Method</span>
                {importAccordionOpen ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {/* Cards Content */}
              {importAccordionOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 animate-fade-in">
                  {/* Method 1: LinkedIn Search */}
                  <div
                    onClick={() => setSelectedMethod('linkedin')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'linkedin'
                      ? 'bg-[#F6F8FF] dark:bg-[#F9FBFF] border-[#3666EE] shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'linkedin' && (
                      <div className="absolute top-3 right-3 size-5 bg-primary text-white rounded-sm flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'linkedin' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Linkedin className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">LinkedIn Search</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          (Basic, Sales Nav, Post, Group or Event URL)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 2: Upload CSV File */}
                  <div
                    onClick={() => setSelectedMethod('csv')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'csv'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'csv' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'csv' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Upload CSV File</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Upload LinkedIn profiles via CSV. <span className="text-brand-blue font-semibold hover:underline">Download Sample</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 3: Lookalike Audience */}
                  <div
                    onClick={() => {
                      setSelectedMethod('list');
                      setIsLookalikeModalOpen(true);
                    }}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'list'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'list' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'list' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Users className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Lookalike Audience</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Use Lead Finder to find audience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 4: Inbound Webhook */}
                  <div
                    onClick={() => setSelectedMethod('webhook')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'webhook'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'webhook' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'webhook' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Webhook className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Inbound Webhook</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Sync leads from zapier, n8n make in real time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-step 2: Paste URL / Method Details */}
            <div className="relative space-y-4">

              {selectedMethod === 'list' ? "" :
                <>
                  {/* Node 2 */}
                  <div className="absolute -left-8 top-5 size-5 rounded-full border-2 border-primary bg-white dark:bg-slate-900 flex items-center justify-center z-10">
                    <div className="size-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full p-4 bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md font-bold text-[#444050] dark:text-slate-100">
                    <span className="text-base font-medium text-[#444050] dark:text-slate-200">
                      {selectedMethod === 'linkedin' && 'Paste LinkedIn Search URL'}
                      {selectedMethod === 'csv' && 'Upload CSV File'}
                      {selectedMethod === 'list' && 'Lookalike Audience Selection'}
                      {selectedMethod === 'webhook' && 'Inbound Webhook Configuration'}
                    </span>
                    {selectedMethod == 'csv' && (
                      <span className='bg-[#F8F8F8] px-3 py-1 rounded-sm font-semibold text-[#6E6B7B] text-xs'>Step 1 of 2</span>
                    )}
                  </div>
                </>
              }



              {/* Details Card */}

              {selectedMethod === 'linkedin' && (
                <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md p-6">
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-350 text-sm">
                        <div className="size-4 text-primary shrink-0">
                          <Linkedin className="size-4" />
                        </div>
                        <span className="font-normal text-slate-600 dark:text-slate-300">
                          Find your target audience with{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">LinkedIn Search</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Sales Navigator</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Post URL</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Group URL</a>
                        </span>
                      </div>
                      <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 text-xs text-primary hover:text-brand-blue-hover font-medium shrink-0">
                        <Info className='size-3' />
                        Search Guide
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="https://www.linkedin.com/search/results/people/?keywords="
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                      />
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-primary hover:bg-brand-blue-hover text-white rounded-md text-sm font-semibold transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        Validate
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="size-2 rounded-full bg-primary/50 flex items-center justify-center">
                        <div className="size-1 rounded-full bg-primary"></div>
                      </div>
                      <span>Paste the search URL directly from Linkedin</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'csv' && (
                <div className="space-y-4">
                  <div className="border border-dashed border-primary dark:border-slate-700/60 rounded-sm p-8 text-center bg-[#F8FAFF] dark:bg-slate-900 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <span className='flex justify-center items-center gap-1 size-12 bg-[#EAEFFF] rounded-md'>
                      <Upload className="size-8 text-primary dark:text-slate-650" />
                    </span>
                    <div className="text-sm font-medium text-primary dark:text-slate-400">
                      {csvFile ? csvFile.name : "Drag a File or click a browse"}
                    </div>
                    <div className="text-xs text-[#5E5873]">File with up to 100 rows works best</div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files[0])}
                      className="hidden"
                      id="csv-upload-field"
                    />
                    <label htmlFor="csv-upload-field" className="px-4 py-1.5 bg-[#EAEFFF] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                      Select File
                    </label>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-[#5E5873] dark:text-slate-500 cursor-pointer'>
                    <CloudDownload className='text-primary' /> Download a sample file
                  </div>
                </div>
              )}


              {selectedMethod === 'webhook' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h5 className="font-normal text-slate-600 dark:text-slate-300">Inbound Webhook Url</h5>
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                        Send JSON payloads to this address. Ensure you specify fields such as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">email</code> and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">linkedinUrl</code>.
                      </p>
                    </div>
                    <button
                      onClick={copyWebhookUrl}
                      className="flex items-center gap-1 text-xs text-brand-blue hover:text-brand-blue-hover font-semibold cursor-pointer shrink-0"
                    >
                      <Copy className="size-3.5" />
                      Copy URL
                    </button>
                  </div>
                  <div className="font-mono text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-md text-slate-600 dark:text-slate-400 break-all select-all">
                    https://api.frontendtask.com/v1/webhooks/inbound/usr_9837a2810
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* STEP 2: SENDER PROFILES */}
        {currentStep === 2 && (
          <div className="space-y-6">

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
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${isActive
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
                      onChange={(e) => setDailyLimits({ ...dailyLimits, connections: parseInt(e.target.value) })}
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
                      onChange={(e) => setDailyLimits({ ...dailyLimits, emails: parseInt(e.target.value) })}
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
                      onChange={(e) => setTracking({ ...tracking, opens: e.target.checked })}
                      className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30 size-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-655 dark:text-slate-400 font-medium">Track email open rates</span>
                  </label>

                  {/* Track 2 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tracking.clicks}
                      onChange={(e) => setTracking({ ...tracking, clicks: e.target.checked })}
                      className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30 size-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-655 dark:text-slate-400 font-medium">Track email link click clicks</span>
                  </label>

                  {/* Track 3 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tracking.replies}
                      onChange={(e) => setTracking({ ...tracking, replies: e.target.checked })}
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
                      setCampaignDetails({ ...campaignDetails, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${errors.name ? 'border-rose-500 ring-2 ring-rose-500/25' : 'border-slate-200 dark:border-slate-800'
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
                      onChange={(e) => setCampaignDetails({ ...campaignDetails, channel: e.target.value })}
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
                      onChange={(e) => setCampaignDetails({ ...campaignDetails, status: e.target.value })}
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
                      setCampaignDetails({ ...campaignDetails, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${errors.subject ? 'border-rose-500 ring-2 ring-rose-500/25' : 'border-slate-200 dark:border-slate-800'
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
                    onChange={(e) => setCampaignDetails({ ...campaignDetails, description: e.target.value })}
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
        <div className="flex items-center justify-end gap-4 mt-10">
          {currentStep === 1 ? '' : <button
            type="button"
            onClick={handleBackStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </button>}

          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>{currentStep === 4 ? 'Launch Campaign' : 'Next'}</span>
          </button>
        </div>



      </div>
    </div>
  );
}
