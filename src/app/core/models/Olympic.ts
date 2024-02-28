import { Participations } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export class OlympicCountries {
    id!: number;
    country!: string;
    participations!: Participations[];
}