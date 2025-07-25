/**
 * Copyright 2025 ArubaKube S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ColDef } from "ag-grid-community";
import { Pod } from "../../../modules/pod/models/pod";
import { PodLabelsRendererComponent } from "./renderer/pod-labels-renderer.component";
import { PodStatusRendererComponent } from "./renderer/pod-status-renderer.component";
@Component({
  selector: '[pod-table]',
  templateUrl: './pod-table.component.html',
})
export class PodTableComponent implements OnInit {
  @Input() public pods: Pod[] = [];
  @Input() namespaceName!: string;
  columnDefs: ColDef[] = []

  ngOnInit(): void {
    console.log(this.translateService.translate("pods.nameLabel"));
    this.columnDefs = [
      { headerValueGetter: () => this.translateService.translate("pods.nameLabel"), field: 'name' },
      { headerValueGetter: () => this.translateService.translate("pods.namespaceLabel"), field: 'namespace' },
      { headerValueGetter: () => this.translateService.translate("pods.nodeNameLabel"), field: 'nodeName' },
      {
        headerValueGetter: () => this.translateService.translate("pods.labelsLabel"), field: 'labels',
        cellRenderer: PodLabelsRendererComponent,
        autoHeight: true,
        wrapText: false
      },
      { headerValueGetter: () => this.translateService.translate("pods.statusLabel"), field: 'status', cellRenderer: PodStatusRendererComponent },
      { headerValueGetter: () => this.translateService.translate("pods.restartPolicyLabel"), field: 'restartPolicy' },
      { headerValueGetter: () => this.translateService.translate("pods.imagesLabel"), field: 'images' }
    ];
  }

  constructor(private translateService: TranslocoService) { }
  @Output() onReload = new EventEmitter<boolean>();



  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  reload() {
    this.onReload.emit(true);
  }
}
