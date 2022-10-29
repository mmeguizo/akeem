import { Injectable } from '@angular/core';

@Injectable()

export class ConnectionService {
   public connection: String = "http://localhost:3000";
   // public connection: String = "http://192.168.1.88:80";
}

