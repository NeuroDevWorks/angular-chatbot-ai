import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIClientService } from './services/ai-client.service';

@NgModule({
  imports: [CommonModule],
  providers: [AIClientService]
})
export class AngularAICoreModule {
  static forRoot() {
    return {
      ngModule: AngularAICoreModule,
      providers: [AIClientService]
    };
  }
}
