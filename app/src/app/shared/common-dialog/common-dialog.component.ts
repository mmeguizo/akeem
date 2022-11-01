

import { Component,OnInit,Optional,EventEmitter,Output , OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../../@core/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';



@Component({
  selector: 'ngx-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  public data;
  public headerTitle = '';
  public contentMessage = '';
  constructor(
    // protected ref: NbDialogRef<CommonDialogComponent>,
    public auth: AuthService,
    public activeModal: NgbActiveModal
    ) {}


  ngOnInit(): void {
  }


  submit() {
    this.auth.logout();
  }
  closeModal() {
    this.activeModal.close();
  }


}
