import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../Models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule,NgbPaginationModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  @Input() employee!: Employee;

  constructor(public activeModal: NgbActiveModal) { }
}