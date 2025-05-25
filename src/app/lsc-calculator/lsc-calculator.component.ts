import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { stat } from 'node:fs';

@Component({
  selector: 'app-lsc-calculator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lsc-calculator.component.html',
  styleUrl: './lsc-calculator.component.css'
})
export class LscCalculatorComponent{
  constructor( private formBuilder:FormBuilder ){}
  statList:string[] = ["strength","intelligence","wisdom","dexterity","constitution","charisma","luck"]
  genkai= new Map<string,boolean>([["strength",false],
                                  ["intelligence",false],
                                  ["wisdom",false],
                                  ["dexterity",false],
                                  ["constitution",false],
                                  ["charisma",false],
                                  ["luck",false]])
  kagirinai = new Map<string,boolean>([["strength",false],
                                  ["intelligence",false],
                                  ["wisdom",false],
                                  ["dexterity",false],
                                  ["constitution",false],
                                  ["charisma",false],
                                  ["luck",false]])
  characterInfo:any;
  baseStats:any;
  lscPoints:any;
  statTotals:any;
  remainingPoints:any;
  kagirinaiLevel:number =173;
  genkaiLevels:number[] = [10, 30, 45];
  maxGenkais:number = 0;
  maxKagirinais:number = 0;
  genkaiCount = 0;
  kagirinaiCount = 0;

  ngOnInit(): void{
    console.log("form control initialized")
    this.characterInfo = this.formBuilder.group({
      characterLevel:1,
      baseStats:this.formBuilder.group({
        strength:[10],
        intelligence:[10],
        wisdom:[10],
        dexterity:[10],
        constitution:[10],
        charisma:[10],
        luck:[10]
      }),
      lscPoints:this.formBuilder.group({
        strength:[0],
        intelligence:[0],
        wisdom:[0],
        dexterity:[0],
        constitution:[0],
        charisma:[0],
        luck:[0]
      }),
      coreTotal:this.formBuilder.group({
        strength:[0],
        intelligence:[0],
        wisdom:[0],
        dexterity:[0],
        constitution:[0],
        charisma:[0],
        luck:[0]
      }),
      remainingPoints:this.formBuilder.group({
        strength:[0],
        intelligence:[0],
        wisdom:[0],
        dexterity:[0],
        constitution:[0],
        charisma:[0],
        luck:[0]
      })
    })
    this.baseStats = this.characterInfo.get('baseStats')
    this.lscPoints = this.characterInfo.get('lscPoints')
    this.statTotals = this.characterInfo.get('coreTotal')
    this.remainingPoints = this.characterInfo.get('remainingPoints')
    this.updateTotals()
  }

  calcRemainingPoints(stat:string): number{
    let remaining = 0;
    let top = 20;
    if (this.genkai.get(stat))
    {
      this.genkaiCount++;
      if(this.kagirinai.get(stat)){
        top = 30;
        this.kagirinaiCount++;
      } else {
        top = 25
      }
    }
    remaining = top - parseInt(this.statTotals.value[stat])
    return remaining;
  }

  checkAbilities(): void{
    let currentLevel:number = parseInt(this.characterInfo.value.characterLevel);
    console.log(`${currentLevel} vs`)
    console.log(this.genkaiLevels[1])
    console.log(currentLevel > this.genkaiLevels[1])
    this.maxGenkais = 0;
    
    if (currentLevel >= this.genkaiLevels[0]){
      this.maxGenkais = 1;
    } 
    if (currentLevel >= this.genkaiLevels[1]){
      this.maxGenkais = 2;
    } if (currentLevel >= this.genkaiLevels[2]){
      this.maxGenkais = 3;
    }  

    if (currentLevel >= this.kagirinaiLevel){
      this.maxKagirinais = 1;
    } else {
      this.maxKagirinais = 0;
    }
  }

  updateTotals(): void{
    this.kagirinaiCount=0;
    this.genkaiCount=0;
    // console.log(this.statTotals.value["strength"])
    this.statTotals.patchValue({
      strength:parseInt(this.baseStats.value.strength)+parseInt(this.lscPoints.value.strength),
      intelligence:parseInt(this.baseStats.value.intelligence)+parseInt(this.lscPoints.value.intelligence),
      wisdom:parseInt(this.baseStats.value.wisdom)+parseInt(this.lscPoints.value.wisdom),
      dexterity:parseInt(this.baseStats.value.dexterity)+parseInt(this.lscPoints.value.dexterity),
      constitution:parseInt(this.baseStats.value.constitution)+parseInt(this.lscPoints.value.constitution),
      charisma:parseInt(this.baseStats.value.charisma)+parseInt(this.lscPoints.value.charisma),
      luck:parseInt(this.baseStats.value.luck)+parseInt(this.lscPoints.value.luck)
    })
    // for(let currentStat in this.statList){
    this.statList.forEach((currentStat)=>{
      // console.log(`Current stat: ${currentStat}; total:${this.statTotals.value[currentStat]}`)
      if(this.statTotals.value[currentStat] > 20){
        this.genkai.set(currentStat,true);
      }else{
        this.genkai.set(currentStat,false);
      }
      if(this.statTotals.value[currentStat] > 25){
        this.kagirinai.set(currentStat,true);
      }else{
        this.kagirinai.set(currentStat,false);
      }

      // console.log(`Genkai? ${this.statTotals.value[currentStat] > 20}; is currently: ${this.genkai.get(currentStat)}`)
      this.checkAbilities();
      // this.remainingPoints.patchValue({currentStat:this.calcRemainingPoints(currentStat)})
    })
    // }
    this.remainingPoints.patchValue({
      strength:this.calcRemainingPoints("strength"),
      intelligence:this.calcRemainingPoints("intelligence"),
      wisdom:this.calcRemainingPoints("wisdom"),
      dexterity:this.calcRemainingPoints("dexterity"),
      constitution:this.calcRemainingPoints("constitution"),
      charisma:this.calcRemainingPoints("charisma"),
      luck:this.calcRemainingPoints("luck")
    })
  }

  resetValues(): void{
    console.log("reset button clicked")
    // this.characterInfo.reset();
    this.baseStats.patchValue({strength:[22]})
    // this.characterInfo.patchValue({baseStats:this.baseStats})
  }
}
