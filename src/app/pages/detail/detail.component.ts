import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { LineGraphData } from 'src/app/core/models/LineGraphData';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router, private olympicService: OlympicService, private route: ActivatedRoute) { }

  public xAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = "Dates";
  public yAxis: boolean = true;
  public autoScale: boolean = true;

  public graphData$!: Observable<LineGraphData[]>;

  public olympic$!: Observable<Olympic>;
  public entriesCount!: number;
  public medalsCount!: number;
  public athletesCount!: number;

  ngOnInit(): void {
    this.olympic$ = this.olympicService.getOlympicById(parseInt(this.route.snapshot.params['id'])).pipe(
      tap((olympic: Olympic) => {
        if (!olympic){
          this.router.navigateByUrl("pageNotFound");
        }
        this.entriesCount = olympic.participations.length;
        this.medalsCount = olympic.participations.reduce((acc, curr) => acc + curr.medalsCount, 0);
        this.athletesCount = olympic.participations.reduce((acc, curr) => acc + curr.athleteCount, 0);
      })
    );
    this.graphData$ = this.olympic$.pipe(
      map(data => {
        let series = [...data.participations].map(value => {
          return {
            name: value.year.toString(),
            value: value.medalsCount
          }
        });
        return [
          {
            name: data.country,
            series
          }
        ]
      })
    );
  }
}
