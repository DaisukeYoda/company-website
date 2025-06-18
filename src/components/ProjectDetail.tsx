import React from 'react';

interface ProjectDetailProps {
  title: string;
  description: string;
  features: string[];
  tech: {
    [key: string]: string[];
  };
  status: 'production' | 'active' | 'development';
  github: string;
  index: number;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ title, description, features, tech, status, github, index }) => {
  const statusColors = {
    production: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    development: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  const statusLabels = {
    production: '本番稼働中',
    active: 'アクティブ開発',
    development: '開発中'
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">主な機能</h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">技術スタック</h3>
          {Object.entries(tech).map(([category, techs]) => (
            <div key={category} className="mb-3">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                {category.replace('_', ' ')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {techs.map((t, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-4">
        <a 
          href={`https://github.com/DaisukeYoda/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHubで見る
        </a>
      </div>
    </div>
  );
};

export default ProjectDetail;