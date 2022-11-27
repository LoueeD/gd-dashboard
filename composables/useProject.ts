import { ProjectScreen } from '~~/models/ProjectScreen';

export const useProject = () => {
  const projectScreens = useState('projectScreens', (): ProjectScreen[] => [
    {
      route: '/',
      icon: 'trello',
      title: 'Deals Board',
      nested: [],
      active: true,
    },
    { route: '/', icon: 'briefcase', title: 'Companies', nested: [] },
    { route: '/', icon: 'users', title: 'Contacts', nested: [] },
    {
      route: '/',
      icon: 'book',
      title: 'Deals',
      nested: [
        { route: '/', icon: 'search', title: 'Qualifying', nested: [] },
        { route: '/', icon: 'search', title: 'Proposal Required', nested: [] },
        { route: '/', icon: 'search', title: 'Under Review', nested: [] },
        { route: '/', icon: 'search', title: 'Awaiting Start', nested: [] },
      ],
    },
    { route: '/', icon: 'pie-chart', title: 'Sales Overview', nested: [] },
  ]);

  const projects = useState('projects', () => [
    { name: 'Task Manager' },
    { name: 'Project Manager' },
    { name: 'Applicant Tracker' },
    { name: 'Campaign Manager' },
    { name: 'Holiday Planner' },
    { name: 'New Starters' },
    { name: 'Project Planner' },
    { name: 'Stock Control' },
    { name: 'Webinar Management' },
    { name: 'Asset Manager' },
    { name: '100 Day Marketing Plan' },
    { name: 'Student Tracking' },
    { name: 'Employee Training' },
    { name: 'Expense Tracking' },
  ]);

  const sidebar = useState('sidebar', () => ({ collapsed: false }));

  return {
    sidebar,
    projectScreens,
    projects,
  };
};
