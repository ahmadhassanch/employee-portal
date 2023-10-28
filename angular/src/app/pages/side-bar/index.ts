import { Menu } from 'src/app/models/model';

export class menuListClass {
  menuList: Menu[] = [
    { title: 'Dashboard', rout: 'dashboard', icon: 'dashboard' },
    { title: 'Employees', rout: 'employees', icon: 'people' },
    { title: 'Reports', rout: 'reports', icon: 'description' },
    { title: 'Team', rout: 'team', icon: 'people' },
    { title: 'Settings', rout: 'settings', icon: 'settings' },
  ];
}
