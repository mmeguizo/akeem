import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../@core/services/auth.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { CommonComponent } from '../../../shared/common/common.component';
import { UpdateProfileComponent } from '../../../shared/update-profile/update-profile.component';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  public contentInit = false;

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  name: string;
  profile_pic: string;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              public auth: AuthService,
              public rd: ReverseDate,
              public ngbModal: NgbModal,
              private dialog: MatDialog,
              private breakpointService: NbMediaBreakpointsService,

              ) {
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe(( event ) => {
      //boolean content init will stop the subscribed data from multiplying which cause incremental event
      if(this.contentInit == false){
        this.onItemSelection(event.item.title);
      }
    });


    this.name = this.auth.getTokenUsername();
    this.profile_pic = JSON.parse(this.auth.getUserProfilePic());
    console.log(this.auth.domain + `/` + this.profile_pic)


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      ).subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection(title) {
    if (title === 'Log out') {
      const activeModal = this.ngbModal.open(CommonComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
      activeModal.componentInstance.headerTitle = 'Logout',
      activeModal.componentInstance.bodyContent ='Are you sure you want to logout?',
      activeModal.componentInstance.username = this.name
    } else if (title === 'Profile') {
      const activeModal = this.ngbModal.open(UpdateProfileComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    }
  }



}

