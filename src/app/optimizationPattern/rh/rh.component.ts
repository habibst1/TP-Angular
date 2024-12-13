import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
  inject,
} from '@angular/core';
import { User, UsersService } from '../users.service';
import * as ChartJs from 'chart.js/auto';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RhComponent implements OnInit,DoCheck {
  private userService = inject(UsersService);

  oddUsers: User[];
  evenUsers: User[];
  chart: any;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }
  ngDoCheck(): void {
    console.log('Change detection is running on RhComponent');
  }
  ngOnInit(): void {
    this.createChart();
  }
  addUser(list: User[], newUser: string) {
    this.userService.addUser(list, newUser);
    this.updateChart();
  }
  createChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }
  updateChart() {
    this.chart.data.datasets[0].data = [
      this.oddUsers.length,
      this.evenUsers.length,
    ];
    this.chart.update();
  }
}