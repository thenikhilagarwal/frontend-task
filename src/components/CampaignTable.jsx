import { Mail, MessageSquare, Share2, Bell, Trash2, Calendar, Eye, MousePointerClick } from 'lucide-react';

export default function CampaignTable({ campaigns, onDeleteCampaign }) {
  // Helpers for channel icons
  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'Email':
        return <Mail className="w-4 h-4 text-sky-500" />;
      case 'SMS':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'Social':
        return <Share2 className="w-4 h-4 text-purple-500" />;
      case 'Push':
        return <Bell className="w-4 h-4 text-amber-500" />;
      default:
        return <Mail className="w-4 h-4 text-slate-500" />;
    }
  };

  // Helpers for status classes
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40';
      case 'Draft':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border-slate-200 dark:border-slate-700/60';
      case 'Scheduled':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/40';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-xs overflow-hidden transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20 text-slate-400 dark:text-slate-500 text-[11px] uppercase font-bold tracking-wider">
              <th className="py-4 px-6">Campaign Info</th>
              <th className="py-4 px-6">Subject</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Performance</th>
              <th className="py-4 px-6">Created At</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              >
                {/* Campaign Info */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 border border-slate-100 dark:border-slate-800 transition-colors">
                      {getChannelIcon(campaign.channel)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-850 dark:text-slate-100 text-sm leading-snug">
                        {campaign.name}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {campaign.channel} Campaign
                      </p>
                    </div>
                  </div>
                </td>

                {/* Subject Line */}
                <td className="py-4 px-6 max-w-[200px]">
                  <p className="text-sm text-slate-600 dark:text-slate-350 truncate font-medium">
                    {campaign.subject}
                  </p>
                  {campaign.description && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {campaign.description}
                    </p>
                  )}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusClasses(campaign.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75"></span>
                    {campaign.status}
                  </span>
                </td>

                {/* Performance Metrics */}
                <td className="py-4 px-6">
                  <div className="space-y-1.5 max-w-[150px]">
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{campaign.metrics?.openedRate}% open</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />
                        <span>{campaign.metrics?.clickedRate}% click</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${campaign.metrics?.openedRate}%` }}
                        className="bg-brand-blue h-full rounded-l-full"
                      ></div>
                      <div
                        style={{ width: `${campaign.metrics?.clickedRate}%` }}
                        className="bg-indigo-400 h-full rounded-r-full"
                      ></div>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                      Sent to {campaign.metrics?.sent?.toLocaleString()} users
                    </div>
                  </div>
                </td>

                {/* Date Created */}
                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{campaign.createdAt}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onDeleteCampaign(campaign.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
