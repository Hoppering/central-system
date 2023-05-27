import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {RestApiService} from "./service/rest-api.service";
import {Machine} from "./model/machine";
import {Machinehealth} from "./model/machinehealth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private messageService: MessageService, private restApiService: RestApiService) {
  }

  // @ts-ignore
  visible: boolean;
  // @ts-ignore
  machineId: number;
  // @ts-ignore
  machineName: string;
  // @ts-ignore
  machineIp: string;
  // @ts-ignore
  isAdd: boolean;
  machine: Machine = new Machine();
  machineList: Machine[] = [];
  machineHealth: Machinehealth = new Machinehealth();

  showAddDialog() {
    this.isAdd = true;
    this.machineName = "";
    this.machineIp = "";
    this.visible = true;
  }

  public accept() {
    this.machine.machineName = this.machineName;
    this.machine.machineIp = this.machineIp;
    this.machine.id = this.machineId;
    if (!this.isAdd) {
      this.restApiService.updateMachine(this.machine).subscribe(data => {
        window.location.reload();
      });
    } else {
      this.restApiService.addMachine(this.machine).subscribe(data => {
        this.getMachineHealth(data);
      });
    }
    this.machineName = "";
    this.machineIp = "";
    this.messageService.add({
      severity: 'success',
      summary: this.isAdd ? "Update" : "Added",
      detail: this.isAdd ? "You added new machine" : "You update machine's info"
    });
    this.visible = false;
  }


  ngOnInit() {
    this.restApiService.getMachinesList().subscribe(elements => {
      for (let i: number = 0; i < elements.length; i++) {
        this.getMachineHealth(elements[i]);
      }
    });
  }

  getMachineHealth(machine: Machine) {
    this.restApiService.getMachineHealth(machine.id).subscribe(items => {
      this.machineHealth.freeSize = Math.round(items["components"]["diskSpace"]["details"]["free"] / items["components"]["diskSpace"]["details"]["total"] * 100);
      this.machineHealth.usedSize = Math.round(((items["components"]["diskSpace"]["details"]["total"] - items["components"]["diskSpace"]["details"]["free"]) / items["components"]["diskSpace"]["details"]["total"]) * 100);
      machine.machineHealth = this.machineHealth;
      this.machineList.push(machine);
    })
  }

  deleteMachine(machine: Machine) {
    this.restApiService.deleteMachine(machine.id).subscribe(res => {
      this.machineList = this.machineList.filter(item => item.id !== machine.id);
      // @ts-ignore
      const index = this.machineList.indexOf(machine, 0);
      if (index > -1) {
        this.machineList.splice(index, 1);
      }
      this.messageService.add({severity: 'success', summary: "Deleted", detail: 'You deleted machine'});
    })
  }

  showEditDialog(machineName: string, machineIp: string, id: number) {
    this.isAdd = false;
    this.machineName = machineName;
    this.machineIp = machineIp;
    this.machineId = id;
    this.visible = true;
  }

  cancel() {
    this.isAdd = false;
  }
}
