import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-logging',
    imports: [CommonModule, FormsModule, HttpClientModule, NgIf],
    templateUrl: './logging.html',
    styleUrl: './logging.css',
})
export class Logging {
    public user = {
        username: "",
        password: ""
    }
    errorMessage = '';
    constructor(private authservice: Auth, private router: Router) { }

    public log() {
        console.log(this.user);
        this.authservice.login(this.user).subscribe({
            next: (data: any) => {
                const role = data.role;
                if (role === 'admin') {
                    console.log("Logging user-role is : ", role);
                    this.router.navigate(['/manage-accounts']);
                } else {
                    console.log("Logging user-role is : ", role);
                    this.router.navigate(['/add-employee']);
                }

            },
            error: (error: any) => {
                console.error("Logging Failed", error);
            }
        });
    }
}
