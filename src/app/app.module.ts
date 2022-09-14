import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColumnsComponent } from './columns/columns.component';
import { ColumnComponent } from './column/column.component';
import { TasksComponent } from './tasks/tasks.component';
import { CompletedTasksPipe } from './pipes/completedTasks.pipe';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    SidebarComponent,
    NavbarComponent,
    ColumnsComponent,
    ColumnComponent,
    TasksComponent,
    CompletedTasksPipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
