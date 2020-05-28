import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'transferHeader'})
export class TransferTableHeaderPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'trType': {
        return 'Type';
        break;
      }
      case 'id': {
        return 'ID';
        break;
      }
      case 'created': {
        return 'Created';
        break;
      }
      case 'trStatus': {
        return 'Status';
        break;
      }
      case 'sessionId': {
        return 'Session ID';
        break;
      }
    }
  }
}
