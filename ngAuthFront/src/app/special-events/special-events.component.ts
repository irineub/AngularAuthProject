import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {
  specialEvents:any = []

  constructor(private _eventService: EventService, private router:Router){}

  ngOnInit(){
    this._eventService.getSpecialEvents().subscribe({
      next: res => {
        this.specialEvents = res;
      },
      error: err => {
        console.log(err);
        this.router.navigate(['/login'])
      }
    });
    }
  
}
