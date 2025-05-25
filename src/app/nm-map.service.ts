import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Room {
  id: number;
  name: string;
  x: number;
  y: number;
  exits: { [direction: string]: number };
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NmMapService {
  // Example data, this could be fetched from an API
  private rooms: Room[] = [
    { id: 1, name: "The Ninja Academy Entrance", x: 0, y: 2, exits: { north: 2 }, description: "A giant teardrop of a house sits here boldly" },
    { id: 2, name: "Path Through the Forst", x: 0, y: 1, exits: { south: 1, north: 3 } },
    { id: 3, name: "Eastern Edge of the Forest", x: 0, y: 0, exits: { south: 2, southeast:4 } },
    { id: 4, name: "Deep Forestry", x: 1, y: 1, exits: {northwest: 3, east:5}},
    // { id: 5, name: "Deep Forestry", x:2, y:1, exits: {west:4}}
  ];

  getRooms(): Observable<Room[]> {
    return of(this.rooms); // Could replace this with an HTTP call to fetch data
  }
}
