import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { User } from '../users.service';
import memo from 'memo-decorator'; 

export const fibonnaci = (n: number): number => {
  if (n == 1 || n == 0) {
    return 1;
  }
  return fibonnaci(n - 1) + fibonnaci(n - 2);
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements DoCheck{
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  i: number = 0;
  userFullName: string = '';
  ngDoCheck(): void {
    console.log('Change detection is running on UserListComponent');
  }
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  @memo()
  fibo(n: number): number {
    const fib = fibonnaci(n);
    const num = this.i++;
    console.log({
      num,
      n,
      fib,
      memoized: true,
    });

    return fib;
  }
}