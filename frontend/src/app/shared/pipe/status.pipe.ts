import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    switch (value) {
      case 'waiting':
        return 'En attente';
      case 'unjustified':
        return 'Non justifiée';
      case 'justified':
        return 'Justifiée';
      default:
        return 'En attente';
    }
  }
}
