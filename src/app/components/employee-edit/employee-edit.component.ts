import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule,NgbPaginationModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  @Input() employee!: Employee;

  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.employeeService.updateEmployee(this.employee)
        .subscribe(() => {
          this.activeModal.close('updated');
        });
    }
  }
}