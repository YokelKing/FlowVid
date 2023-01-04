import { Component, Input, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPagesService } from 'src/app/user-pages/user-pages.services';
import { IUser } from '../models/user';
import { NavItem } from '../models/nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { SharedServiceService } from '../shared.service.service'
import { IMenu, Menu } from '../models/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {


  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  displayName: string = null;
  currentUser$: Observable<IUser>;

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded: any;
  @Input() item: NavItem;
  @Input() depth: number;
  chk: boolean;
  navItems: NavItem[];
  roleId: number;
  children: any;


  constructor(private accountService: UserPagesService, private sharedServiceService: SharedServiceService,
    public router: Router) {
  }
  ObjMenus: Array<Menu> = new Array<Menu>();
  ObjMenu: Menu = new Menu();
  ngOnInit() {
    //debugger;
    this.currentUser$ = this.accountService.getCurrentUser();
    this.getAllMenus();
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  names: any = {};
  onItemSelected(item: NavItem) {
    localStorage.setItem("breadcrumbsData", JSON.stringify([]));
    //this.generateNumber(item);
    if (!item.children || !item.children.length) {
      localStorage.setItem('chk', 'true');
      this.router.navigate([item.route]);

    }
    if (item.children && item.children.length) {

      this.expanded = !this.expanded;
    }

  }
  getAllMenus() {
    // debugger;
    this.sharedServiceService.getMenus().subscribe(
      result => {
        this.navItems = result;
        for (let cost of this.navItems) {
          this.navItems.filter(x => x.parentId === cost.id);
          this.ObjMenu.id = cost.id;
          this.ObjMenu.displayName = cost.displayName;
          this.ObjMenu.menuURL = cost.menuURL;
          this.ObjMenu.parentId = cost.parentId;
          this.ObjMenu.Children = this.navItems.filter(x => x.parentId === cost.id);
          this.ObjMenus.push(this.ObjMenu);
          this.ObjMenu = new Menu();

        }


      }, error => {
        console.log(error);
      }
    )
  }

  navigateToUrl(item) {
    this.router.navigate([item.route]);
  }




}
