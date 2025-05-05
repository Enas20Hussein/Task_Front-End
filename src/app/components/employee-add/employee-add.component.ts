import { Component } from '@angular/core';
import { NgbActiveModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: ''
  };

  // Track validation state
  formSubmitted = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    
    if (form.valid) {
      this.employeeService.addEmployee(this.employee)
        .subscribe({
          next: () => {
            this.activeModal.close('saved');
          },
          error: (err) => {
            console.error('Error adding employee:', err);
          }
        });
    }
  }

  // Helper method to check field validity
  isFieldInvalid(field: string, form: NgForm): boolean {
    const control = form.controls[field];
    return (control?.invalid && (control?.dirty || control?.touched || this.formSubmitted)) || false;
  }
}