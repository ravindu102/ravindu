
import React from 'react';
import { Tab } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ChecklistIcon } from './icons/ChecklistIcon';
import { NoteIcon } from './icons/NoteIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface TabButtonProps {
  label: string;
  tabName: Tab;
  activeTab: Tab;
  onClick: (tab: Tab) => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ label, tabName, activeTab, onClick, children }) => {
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={() => onClick(tabName)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-sky-500 text-white shadow-md'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};


const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-sky-400">UniHelper</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <TabButton label="Timetable" tabName="timetable" activeTab={activeTab} onClick={setActiveTab}>
              <CalendarIcon />
            </TabButton>
            <TabButton label="Assignments" tabName="assignments" activeTab={activeTab} onClick={setActiveTab}>
              <ChecklistIcon />
            </TabButton>
            <TabButton label="Notes" tabName="notes" activeTab={activeTab} onClick={setActiveTab}>
              <NoteIcon />
            </TabButton>
            <TabButton label="GPA Calc" tabName="gpa" activeTab={activeTab} onClick={setActiveTab}>
              <CalculatorIcon />
            </TabButton>
            <TabButton label="AI Buddy" tabName="aiBuddy" activeTab={activeTab} onClick={setActiveTab}>
                <SparklesIcon />
            </TabButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
