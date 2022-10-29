import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { dataFilterPipe, NumberWithCommas, IsRead, SumPipe, AssetsPipe, ReverseDate, StripTags, RoundOff, ChatMessagePipe, FileNameOnly } from '../@core/pipes/dataFilter';
import { TruncatePipe, TruncateTextPipe } from '../@core/pipes/truncate';
import { DataTableModule } from 'angular2-datatable';
import { NbStepperModule, NbSpinnerModule, NbListModule, } from '@nebular/theme';
// import { MomentModule } from 'angular2-moment';
//
// from valor components
// import { TooltipModule, BsDatepickerModule, TimepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NbMenuModule, NbActionsModule, NbTreeGridModule } from '@nebular/theme';
import { TimeagoModule } from 'ngx-timeago';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatStepperModule} from '@angular/material/stepper';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

//https://www.npmjs.com/package/ngx-progressive-image-loader
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

//https://angularscript.com/fullscreen-swipeable-viewer/
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';



import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbAccordionModule,

} from '@nebular/theme';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatIconModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatStepperModule
];

const MODULES = [
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
];

@NgModule({
  imports: [
    DataTableModule,
    NbStepperModule,
    NbSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NbMenuModule.forRoot(),
    NbTreeGridModule,
    BsDropdownModule,
    PasswordStrengthMeterModule,
    NgImageFullscreenViewModule,
    NbAccordionModule,
    RouterModule,
    ...MODULES,
    ...materialModules,
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '10px',
      threshold: 0.1,
      // css filter
      // filter: 'blur(3px) drop-shadow(0 0 0.75rem crimson)',
      // image width / height ratio for image holder
      imageRatio: 4 / 4,
      // loading image in placeholder. Can be URL or base64
      placeholderImageSrc:
        // tslint:disable-next-line:max-line-length
        'data:image/jpeg;base64, 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'
    })
  ],
  declarations: [
    dataFilterPipe,
    NumberWithCommas,
    IsRead,
    TruncateTextPipe,
    TruncatePipe,
    SumPipe,
    AssetsPipe,
    ReverseDate,
    StripTags,
    RoundOff,
    ChatMessagePipe,
    FileNameOnly,
  ],
  entryComponents: [

  ],
  exports: [
    dataFilterPipe,
    NumberWithCommas,
    IsRead,
    SumPipe,
    AssetsPipe,
    ReverseDate,
    ChatMessagePipe,
    FileNameOnly,
    TruncateTextPipe,
    TruncatePipe,
    StripTags,
    RoundOff,
    NbStepperModule,
    NbSpinnerModule,
    BsDatepickerModule,
    TimepickerModule,
    NbListModule,
    TooltipModule,
    CommonModule,
    TimeagoModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    NbAccordionModule,
    RouterModule,
    NgxProgressiveImageLoaderModule,
    NgImageFullscreenViewModule,
    ...materialModules
  ],
  providers: [
    // ReverseDate
  ]
})
export class SharedModule { }
