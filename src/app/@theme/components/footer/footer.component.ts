import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Made with ❤️ by <b><a href="https://github.com/yassinesebai" target="_blank">Yassine Sebai</a></b> <i> 2023</i>
    </span>
    <div class="socials">
      <a href="https://github.com/yassinesebai" target="_blank" class="ion ion-social-github"></a>
      <a href="https://twitter.com" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/ys0/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
