import { Params } from "@angular/router";

export interface NavItem {
    children?: NavItem[];
    id ?: number;
    displayName: string;
    iconName: string;
    route: string;
    menuURL: string;
    parentId ? :number
    menuHeirarchy ? :number;
  }
  export interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
  }