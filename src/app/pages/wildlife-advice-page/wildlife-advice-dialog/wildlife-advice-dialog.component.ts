import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdviceGeneric } from '../models/advice.model';

@Component({
  selector: 'app-wildlife-advice-dialog',
  templateUrl: './wildlife-advice-dialog.component.html',
  styleUrls: ['./wildlife-advice-dialog.component.scss']
})
export class WildlifeAdviceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public adviceGenericObject: AdviceGeneric) {
  }
  
  ngOnInit(): void {
  }

}