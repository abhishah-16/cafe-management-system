import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string
}

const menuitem = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Category', icon: 'category', role: 'admin' }
]
@Injectable()
export class MenuItem {
    getmenuitems(): Menu[] {
        return menuitem
    }
}