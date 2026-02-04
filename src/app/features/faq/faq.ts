import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  faqs = [
    {
      question: 'How do I add a new employee?',
      answer: 'After logging in, click on "Add Employee" in the navigation menu. Fill in the employee details like name, email, department, and role, then click Submit.',
      isOpen: true
    },
    {
      question: 'How can I view all employees?',
      answer: 'Click on "View Employees" in the navigation menu after logging in. You will see a table with all employee records.',
      isOpen: false
    },
    {
      question: 'How do I edit an employee?',
      answer: 'In the View Employees page, click the Edit button next to the employee you want to modify. Update the details and save.',
      isOpen: false
    },
    {
      question: 'How do I delete an employee?',
      answer: 'In the View Employees page, click the Delete button next to the employee. Confirm the deletion when prompted.',
      isOpen: false
    },
    {
      question: 'What login credentials should I use?',
      answer: 'Use the credentials provided by your administrator. Contact support if you need access.',
      isOpen: false
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! The system uses secure authentication and all data is protected.',
      isOpen: false
    }
  ];

  toggleQuestion(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
