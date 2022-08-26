import { Component } from "@angular/core";

@Component({
    selector: "app-server",
    templateUrl: "./server.component.html",
    styleUrls: ["../servers/servers.component.css"] //you can reference stylesheets from other components
})

export class ServerComponent { 
    serverId = 10;
    serverStatus = "Offline";

    getserverStatus() {
        return this.serverStatus;
    }
}