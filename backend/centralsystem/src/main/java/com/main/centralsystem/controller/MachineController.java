package com.main.centralsystem.controller;

import com.main.centralsystem.machine.Machine;
import com.main.centralsystem.machine.MachineService;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/")
public class MachineController {

  @Autowired
  MachineService machineService;

  @GetMapping("/machines")
  @ResponseBody
  public ResponseEntity<List<Machine>> getListMachines() {
    return ResponseEntity.ok().body(machineService.getListMachines());
  }

  @PostMapping("/machines")
  @ResponseBody
  public ResponseEntity<Machine> addNewMachine(@RequestBody Machine machine) {
    return ResponseEntity.status(201).body(machineService.createMachine(machine));
  }

  @DeleteMapping("/machines/{machine-id}")
  @ResponseBody
  public ResponseEntity<String> deleteMachine(@PathVariable("machine-id") Long id) {
    machineService.deleteMachine(id);
    return ResponseEntity.status(200).body("Deleted");
  }

  @PutMapping("/machines")
  @ResponseBody
  public ResponseEntity<Machine> updateMachine(@RequestBody Machine machine) {
    return ResponseEntity.status(200).body(machineService.updateMachine(machine));
  }

  @GetMapping("/machines/{machine-id}")
  @ResponseBody
  public ResponseEntity<String> getInfoMachineByEndpoint(@PathVariable("machine-id") long id,
      @RequestParam(value = "endpoint", defaultValue = "mappings") String endpoint)
      throws IOException, InterruptedException {
    Machine machine = machineService.getMachineById(id);
    final String address = "http://" + machine.getMachineIp() + "/admin/";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(address + endpoint))
        .GET()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    return ResponseEntity.ok().body(response.body());
  }

}
