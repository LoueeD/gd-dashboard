import { ProjectScreen } from '~~/models/ProjectScreen';

export const useProject = () => {
  const projectScreens = useState('projectScreens', (): ProjectScreen[] => [
    {
      route: '/board',
      icon: 'trello',
      title: 'Deals Board',
      nested: [],
      active: true,
    },
    { route: '/', icon: 'briefcase', title: 'Companies', nested: [] },
    { route: '/contracts', icon: 'users', title: 'Contacts', nested: [] },
    {
      route: '/deals',
      icon: 'book',
      title: 'Deals',
      nested: [
        {
          route: '/deals/qualifying',
          icon: 'search',
          title: 'Qualifying',
          nested: [],
        },
        {
          route: '/deals/proposal-required',
          icon: 'search',
          title: 'Proposal Required',
          nested: [],
        },
        {
          route: '/deals/under-review',
          icon: 'search',
          title: 'Under Review',
          nested: [],
        },
        {
          route: '/deals/awaiting-start',
          icon: 'search',
          title: 'Awaiting Start',
          nested: [],
        },
      ],
    },
    {
      route: '/dashboard',
      icon: 'pie-chart',
      title: 'Sales Overview',
      nested: [],
    },
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

  const sidebar = useState('sidebar', () => ({
    collapsed: false,
    width: null,
  }));

  return {
    sidebar,
    projectScreens,
    projects,
  };
};
