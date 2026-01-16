import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './policy.html',
  styleUrls: ['./policy.css']
})
export class PolicyComponent {
  
  downloadPolicy() {
    // In a real app, this would download a PDF
    alert('PDF download would start here in production.');
    
    // For demo purposes:
    const element = document.createElement('a');
    element.setAttribute('href', 'assets/policy.pdf');
    element.setAttribute('download', 'DryFruit-Store-Privacy-Policy.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}