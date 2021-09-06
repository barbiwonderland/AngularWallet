import { ActivityService } from './../../../../services/activity.service';
import { IActivity } from './../../../../models/activity,model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// // const listActivities: Activity[] = this.activity;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  activity!: IActivity[];
  dataSource!: any;
  constructor(private ActivityService: ActivityService) {}
  ngOnInit(): void {
    this.activity = this.ActivityService.getActivities();
    this.dataSource = new MatTableDataSource(this.activity);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['date', 'concept', 'amount', 'currency'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
