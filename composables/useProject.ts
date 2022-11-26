export const useProject = () => {
  const projectScreens = useState('projectScreens', () => [
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

  return {
    projectScreens,
  };
};
