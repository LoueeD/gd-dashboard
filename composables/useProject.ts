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
    { route: '/companies', icon: 'briefcase', title: 'Companies', nested: [] },
    { route: '/', icon: 'users', title: 'Contacts', nested: [] },
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

  const projectSettings = useState('projectSettings', () => ({
    visible: false,
  }));

  const sidebar = useState('sidebar', () => ({
    collapsed: false,
    width: null,
    logo: null,
    background: '',
    textColour: '',
    colour: {
      background: {
        h: 50 as null | number,
        s: 50 as null | number,
        l: 100 as null | number,
      },
      darkText: true,
    },
  }));

  const sidebarColour = computed(() => {
    function css(hsl: {
      h: null | number;
      s: null | number;
      l: null | number;
    }) {
      const { h, s, l } = hsl;
      if (h === null) return undefined;
      if (s === null) return undefined;
      if (l === null) return undefined;
      return `hsl(${h}deg, ${s}%, ${l}%)`;
    }
    const { background, darkText } = sidebar.value.colour;
    return {
      background: css(background),
      textColour: darkText ? '0, 0, 0' : '255, 255, 255',
    };
  });

  return {
    sidebar,
    sidebarColour,
    projectScreens,
    projectSettings,
    projects,
  };
};
