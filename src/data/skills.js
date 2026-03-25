import { IoCodeSharp, IoHardwareChipSharp, IoFlashSharp, IoServerSharp } from "react-icons/io5"
import { LuCircuitBoard } from "react-icons/lu";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";


export const skills = [
  {
    id: 1,
    title: "Programación",
    icon: IoCodeSharp,
    technologies: ["C", "C++", "Python", "MATLAB","VHDL", "Assembly"]
  },
  {
    id: 2,
    title: "Sistemas Embebidos",
    icon: IoHardwareChipSharp,
    technologies: ["Arduino", "ESP32", "UART", "I2C"]
  },
  {
    id: 3,
    title: "Electrónica",
    icon: LuCircuitBoard,
    technologies: ["PCB", "Instrumentación", "Sensores"]
  },
  {
    id: 4,
    title: "Dabase",
    icon: IoServerSharp,
    technologies: ["PCB", "Instrumentación", "Sensores"]
  },
 {
    id: 5,
    title: "Comunicaciones",
    icon: MdOutlineSettingsInputAntenna,
    technologies: ["PCB", "Instrumentación", "Sensores"]
  } 
]