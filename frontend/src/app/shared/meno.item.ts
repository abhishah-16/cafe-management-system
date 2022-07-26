import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string
}

const menuitem = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' }
]
@Injectable()
export class MenuItem {
    getmenuitems(): Menu[] {
        return menuitem
    }
}