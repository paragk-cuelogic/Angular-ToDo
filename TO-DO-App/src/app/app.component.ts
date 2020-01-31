import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './shared/services/messages.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TO-DO-App';
  isRoot = true;
  isError = false;
  isSuccess = false;
  isInfo = false;
  message = '';
  isLoading = false;

  infoSubscription: Subscription;
  successSubscription: Subscription;
  errorSubscription: Subscription;
  spinnerSubscription: Subscription;

  constructor(private router: Router, private messageService: MessagesService) {
    this.infoSubscription = messageService.info.subscribe(value => {
      this.isInfo = value.display;
      this.message = value.show;
    });
    this.successSubscription = messageService.success.subscribe(value => {
      this.isSuccess = value.display;
      this.message = value.show;
    });
    this.errorSubscription = messageService.error.subscribe(value => {
      this.isError = value.display;
      this.message = value.show;
    });
    this.spinnerSubscription = messageService.spinner.subscribe(
      value => (this.isLoading = value)
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.infoSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
  }
}
