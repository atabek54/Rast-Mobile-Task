import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person, PersonService } from 'src/app/services/person.service';
import { DialogComponent } from '../dialog/dialog.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css'],
})
export class GridviewComponent implements OnInit {
  persons: Person[] = [];
  expanded = true;
  visible = false;
  allowColumnResizing = true;
  columnAutoWidth = true;
  showRowLines = false;
  allowColumnReordering = true;
  paging_enabled = true;
  showPageSizeSelector = true;
  showNavigationButtons = true;
  showInfo_pager = true;
  infoText = ' ';
  readonly displayModes = 'compact';
  readonly allowedPageSizes = [5, 10];

  constructor(
    private service: PersonService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    const storedPersons = this.localStorageService.getItem('persons');
    if (storedPersons) {
      this.persons = storedPersons;
    } else {
      this.persons = this.service.getEmployees();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveToLocalStorage(result);
        this.persons.push(result);
      }
    });
  }

  saveToLocalStorage(newPerson: Person): void {
    let storedPersons = this.localStorageService.getItem('persons');
    if (!storedPersons) {
      storedPersons = [];
    }
    storedPersons.push(newPerson);
    this.localStorageService.setItem('persons', storedPersons);
  }
  ngAfterContentInit(): void {}
  onEditorPreparing(e: any) {
    if (e.parentType === 'searchPanel') {
      e.editorOptions.stylingMode = 'filled';
      e.editorOptions.background = 'white';
      e.editorOptions.highlightSearchText = false;
      e.editorOptions.labelMode = 'floating';
      e.editorOptions.placeholder = 'Search Objects..';
    }
  }
}
