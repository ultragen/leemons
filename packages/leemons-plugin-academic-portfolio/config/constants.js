const permissionsPrefix = 'plugins.academic-portfolio';

const permissionNames = {
  portfolio: `${permissionsPrefix}.portfolio`,
  programs: `${permissionsPrefix}.programs`,
  subjects: `${permissionsPrefix}.subjects`,
  tree: `${permissionsPrefix}.tree`,
};

const permissions = [
  {
    permissionName: permissionNames.portfolio,
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: { es: 'Portfolio Académico', en: 'Academic Portfolio' },
  },
  {
    permissionName: permissionNames.programs,
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: {
      es: 'Portfolio Académico - Programas',
      en: 'Academic Portfolio - Programs',
    },
  },
  {
    permissionName: permissionNames.subjects,
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: {
      es: 'Portfolio Académico - Asignaturas',
      en: 'Academic Portfolio - Subjects',
    },
  },
  {
    permissionName: permissionNames.tree,
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: { es: 'Portfolio Académico - Árbol', en: 'Academic Portfolio - Tree' },
  },
];

const permissionsBundles = {
  portfolio: {
    create: {
      permission: permissionNames.portfolio,
      actions: ['create', 'admin'],
    },
    view: {
      permission: permissionNames.portfolio,
      actions: ['view', 'admin'],
    },
    update: {
      permission: permissionNames.portfolio,
      actions: ['update', 'admin'],
    },
    delete: {
      permission: permissionNames.portfolio,
      actions: ['delete', 'admin'],
    },
  },
  programs: {
    create: {
      permission: permissionNames.programs,
      actions: ['create', 'admin'],
    },
    view: {
      permission: permissionNames.programs,
      actions: ['view', 'admin'],
    },
    update: {
      permission: permissionNames.programs,
      actions: ['update', 'admin'],
    },
    delete: {
      permission: permissionNames.programs,
      actions: ['delete', 'admin'],
    },
  },
  subjects: {
    create: {
      permission: permissionNames.subjects,
      actions: ['create', 'admin'],
    },
    view: {
      permission: permissionNames.subjects,
      actions: ['view', 'admin'],
    },
    update: {
      permission: permissionNames.subjects,
      actions: ['update', 'admin'],
    },
    delete: {
      permission: permissionNames.subjects,
      actions: ['delete', 'admin'],
    },
  },
  tree: {
    create: {
      permission: permissionNames.tree,
      actions: ['create', 'admin'],
    },
    view: {
      permission: permissionNames.tree,
      actions: ['view', 'admin'],
    },
    update: {
      permission: permissionNames.tree,
      actions: ['update', 'admin'],
    },
    delete: {
      permission: permissionNames.tree,
      actions: ['delete', 'admin'],
    },
  },
};

const menuItems = [
  // Main
  {
    item: {
      key: 'portfolio',
      iconSvg: '/public/academic-portfolio/menu-icon.svg',
      activeIconSvg: '/public/academic-portfolio/menu-icon.svg',
      label: {
        en: 'Academic Portfolio',
        es: 'Portfolio Académico',
      },
    },
    permissions: [
      {
        permissionName: permissionNames.portfolio,
        actionNames: ['view', 'admin'],
      },
    ],
  },
  // Welcome
  {
    item: {
      key: 'welcome',
      order: 1,
      parentKey: 'portfolio',
      url: '/private/academic-portfolio/welcome',
      label: {
        en: 'Welcome',
        es: 'Bienvenida',
      },
    },
    permissions: [
      {
        permissionName: permissionNames.portfolio,
        actionNames: ['view', 'admin'],
      },
    ],
  },
  // Learning Program
  {
    item: {
      key: 'programs',
      order: 2,
      parentKey: 'portfolio',
      url: '/private/academic-portfolio/programs',
      label: {
        en: 'Learning Programs',
        es: 'Programas educativos',
      },
      disabled: true,
    },
    permissions: [
      {
        permissionName: permissionNames.programs,
        actionNames: ['view', 'admin'],
      },
    ],
  },
  // Subjects
  {
    item: {
      key: 'subjects',
      order: 3,
      parentKey: 'portfolio',
      url: '/private/academic-portfolio/subjects',
      label: {
        en: 'Subjects',
        es: 'Asignaturas',
      },
      disabled: true,
    },
    permissions: [
      {
        permissionName: permissionNames.subjects,
        actionNames: ['view', 'admin'],
      },
    ],
  },
  // Tree
  {
    item: {
      key: 'tree',
      order: 4,
      parentKey: 'portfolio',
      url: '/private/academic-portfolio/tree',
      label: {
        en: 'Portfolio Tree',
        es: 'Árbol académico',
      },
      disabled: true,
    },
    permissions: [
      {
        permissionName: permissionNames.tree,
        actionNames: ['view', 'admin'],
      },
    ],
  },
];

module.exports = {
  pluginName: permissionsPrefix,
  permissions: {
    permissions,
    names: permissionNames,
    bundles: permissionsBundles,
  },
  menuItems,
};