package com.main.centralsystem.machine;

import com.main.centralsystem.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MachineService {

  @Autowired
  private MachineRepository machineRepository;

  public Machine createMachine(Machine machine) {
    return machineRepository.save(machine);
  }

  public List<Machine> getListMachines() {
    return machineRepository.findAll();
  }

  public Machine getMachineById(Long id) {
    return machineRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Machine not exist with id :" + id));
  }

  public Machine updateMachine(Machine machineDetails) {
    Machine machine = machineRepository.findById(machineDetails.getId())
        .orElseThrow(() -> new ResourceNotFoundException(
            "Machine not exist with id :" + machineDetails.getId()));
    machine.setMachineIp(machineDetails.getMachineIp());
    machine.setMachineName(machineDetails.getMachineName());
    return machineRepository.save(machine);
  }

  public void deleteMachine(Long id) {
    machineRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(
            "Machine not exist with id :" + id));
    machineRepository.deleteById(id);
  }
}
