import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    EmployeeService,
    provideRouter(routes) 
  ]
};
