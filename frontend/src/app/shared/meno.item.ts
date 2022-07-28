import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string
}

const menuitem = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Category', icon: 'category', role: 'admin' },
    { state: 'product', name: 'Product', icon: 'inventory_2', role: 'admin' },
    { state: 'order', name: 'Order', icon: 'list_alt', role: 'admin' },     
]
@Injectable()
export class MenuItem {
    getmenuitems(): Menu[] {
        return menuitem
    }
}