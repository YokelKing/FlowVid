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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(270deg)' })),
      state('expanded', style({ transform: 'rotate(360deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
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
    this.sharedServiceService.getMenus().subscribe(
      result => {
       this.navItems = result;       

      }, error => {
        console.log(error);
      }
    )
  }

  navigateToUrl(item) {
    this.router.navigate([item.route]);
  }




}
