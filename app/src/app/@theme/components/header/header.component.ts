import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../@core/services/auth.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { CommonDialogComponent } from '../../../shared/common-dialog/common-dialog.component';
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

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              public auth: AuthService,
              public rd: ReverseDate,
              public ngbModal: NgbModal

              ) {
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe(( event ) => {
      //boolean content init will stop the subscribed data from multiplying which cause incremental event
      if(this.contentInit == false){
        this.onItemSelection(event.item.title);
      }
    });

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
      const activeModal = this.ngbModal.open(CommonDialogComponent
        , { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.headerTitle = 'Log Out';
      activeModal.componentInstance.contentMessage = 'Are you sure you want to logout?';
     activeModal.result.then((result) => {
      activeModal.close();
    }, (reason) => {
      activeModal.close();
    });

    } else if (title === 'Profile') {
     // this.updateUser();
    }
  }


}
