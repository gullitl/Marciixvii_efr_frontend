import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';

import { TablesKitchenSinkService } from './clients-list.service';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { MtxGridColumn } from '@ng-matero/extensions';
import { Router } from '@angular/router';
import { ClientCrudService } from '../clients-crud/client-crud.service';

@Component({
  selector: 'app-table-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [TablesKitchenSinkService, TablesDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesKitchenSinkComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Position', field: 'position', width: '100px', sortable: true },
    { header: 'Avatar', field: 'avatar', type: 'image' },
    { header: 'Name', field: 'name', width: '250px', sortable: true, disabled: true },
    { header: 'Mobile', field: 'mobile' },
    { header: 'Gender', field: 'gender' },
    { header: 'Address', field: 'address', width: '400px' },
    {
      header: 'Option',
      field: 'option',
      width: '120px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          icon: 'edit',
          tooltip: 'Edit',
          type: 'icon',
          click: record => this.edit(record),
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          type: 'icon',
          pop: true,
          popTitle: 'Confirm delete?',
          click: record => this.delete(record),
        },
      ],
    },
  ];
  list = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnMovable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 5,
  };

  constructor(
    private dataSrv: TablesDataService,
    private router: Router,
    private clientCrudService: ClientCrudService,
    public dialog: MtxDialog
  ) {

  }

  ngOnInit() {
    this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    this.router.navigateByUrl('/registre/clients-crud');
    // const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
    //   width: '600px',
    //   data: { record: value },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  search() {
    this.query.page = 0;
    this.dataSrv.getData();
  }
}
