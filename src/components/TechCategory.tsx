import React from 'react';

interface Technology {
  name: string;
  level: number;
  color: string;
}

interface TechCategoryProps {
  name: string;
  icon: string;
  technologies: Technology[];
}

const TechCategory: React.FC<TechCategoryProps> = ({ name, icon, technologies }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
      </div>
      <div className="space-y-4">
        {technologies.map((tech, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{tech.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000 ease-out`}
                style={{ width: `${tech.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCategory;