import { Menu } from "./menu";


export class menuListClass {
  menuList: Menu[] = [
    { title: 'Home', rout: 'home', icon: 'account_balance' },
    { title: 'Dashboard', rout: 'employees', icon: 'dashboard' },
    { title: 'Products', rout: 'reports', icon: 'shop' },
    { title: 'Catergories', rout: 'team', icon: 'add_shopping_cart' },
    { title: 'Settings', rout: 'settings', icon: 'settings' },
  ];
}
