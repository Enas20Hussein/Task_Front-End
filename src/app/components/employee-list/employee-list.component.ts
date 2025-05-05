import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule,NgbPaginationModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 5;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      });
  }

  openAddModal(): void {
    const modalRef = this.modalService.open(EmployeeAddComponent);
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getEmployees();
      }
    });
  }

  openEditModal(employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeEditComponent);
    modalRef.componentInstance.employee = employee;
    modalRef.result.then((result) => {
      if (result === 'updated') {
        this.getEmployees();
      }
    });
  }

  openDetailsModal(employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeDetailsComponent);
    modalRef.componentInstance.employee = employee;
  }

  deleteEmployee(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(158, 76, 252)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: '#1e1e2d',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.getEmployees();
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          );
        });
      }
    });
  }

  search(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}