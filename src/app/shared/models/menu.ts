export interface IMenu {
    id ?: number;
    displayName: string;
    iconName: string;
    route: string;
    menuURL: string;
    parentId ? :number
    menuHeirarchy ? :number;    
}
export class Menu implements  IMenu
{
    id ?: number;
    displayName: string;
    iconName: string;
    route: string;
    menuURL: string;
    parentId ? :number
    menuHeirarchy ? :number; 
    Children ? :Array<Menu> ;
}