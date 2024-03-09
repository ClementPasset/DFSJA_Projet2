import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { PieGraphData } from 'src/app/core/models/PieGraphData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private olympicService: OlympicService, private router: Router) { }
  
  public olympics$!: Observable<Olympic[]>;
  graphData$!: Observable<PieGraphData[]>;

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.graphData$ = this.olympics$.pipe(
      map(olympics => {
        return olympics !== undefined ? [...olympics].map(olympic => {
          return {
            id: olympic.id,
            name: olympic.country,
            value: olympic.participations.reduce((acc: number, curr: Participation) => {
              return acc + curr.medalsCount
            }, 0),
            extra: { id: olympic.id }
          }
        }) : [];
      })
    );
  }

  onSelect(event: any): void {
    const id: number = event.extra.id;
    this.router.navigateByUrl(`detail/${id}`);
  }
}
