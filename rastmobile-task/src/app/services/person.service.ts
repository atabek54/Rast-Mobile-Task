
import { Injectable } from '@angular/core';
export interface Person {

  social_media_link: string;
  social_media_name: string;
  description: string;
}

const persons: Person[] = [];


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  getEmployees(): Person[] {
      return persons;
  }
}
