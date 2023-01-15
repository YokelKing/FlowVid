import { Component, Input, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPagesService } from 'src/app/user-pages/user-pages.services';
import { IUser } from '../models/user';
import { NavItem } from '../models/nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { SharedServiceService } from '../shared.service.service'
import { IMenu, Menu } from '../models/menu';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(270deg)' })),
      state('expanded', style({ transform: 'rotate(360deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  providers: [],
})


export class NavMenuComponent implements OnInit  {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded :any;
  @Input() item: NavItem;
  @Input() depth: number;
  chk: boolean;
  navItems: NavItem[];
  roleId: number;


  @Output() private numberGenerated = new EventEmitter<any[]>();
  //@Output() myEvent = new EventEmitter();
    breadcrumbList: any;
    uRoleID: string;
  username: string;
  constructor(
    public router: Router ) {
    this.ariaExpanded = this.expanded;
   
    if (this.depth === undefined) {
      this.depth = 0;
    }
    localStorage.setItem('chk', 'false');
   // this.getAllMenus();
    //this.generateNumber(this.item);
  }


  ngOnInit() {
    //this.navService.currentUrl.subscribe((url: string) => {
    //   if (localStorage.getItem('chk') == "false") {
    //    if (this.item.route && url) {
    //      this.expanded = url.indexOf(`/${this.item.route}`) === 0;
    //      this.ariaExpanded = this.expanded;
    //    }
    //  }
    //});


  }
  names: any = {};
  onItemSelected(item: NavItem) {
    
    //this.generateNumber(item);
    if (!item.children || !item.children.length) {
      localStorage.setItem('chk', 'true');
      this.router.navigate([item.route]);


      // If same link is clicked again, then it reloads the component. ---begin

      //let childrens = item.route.split('/');

      //let currentUrl = this.router.url.split('/');

      //if (childrens[childrens.length - 1] == currentUrl[currentUrl.length - 1]) {
      //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      //    this.router.navigate([item.route]));
      //  localStorage.setItem("breadcrumbsData", JSON.stringify([]));
      //}

      // If same link is clicked again, then it reloads the component. ---end

      //this.navService.closeNav();
    }
    if (item.children && item.children.length) {

      this.expanded = !this.expanded;
    }
   
  }

 

  navigateToUrl(item) {
    this.router.navigate([item.route]);
  }

  public generateNumber(item: NavItem) {
    if (item.children.length === 0) {
      if (item !== undefined) {
        
        this.numberGenerated.emit(this.names);
        sessionStorage.setItem('menudisplayName', ' / ' + item.displayName);
         sessionStorage.setItem('menuroute', item.route);
        
           
      }
    }
    
     
  }


}
