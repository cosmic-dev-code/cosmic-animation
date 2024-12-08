interface CosmicAnimateSettings{
    name:string;
    delay:number;
    duration:number;
    iterationCount:number;
    direction:string;
    timingFunction:string;
    fillMode:string;
}

interface CosmicAnimateViewport{
    enabled:boolean;
    infinite:boolean;
}

interface CosmicAnimatePart3{
    part1:string[];
    part2:string[];
    part3:string[];
}

interface CosmicAnimatePart5{
    part1:string[];
    part2:string[];
    part3:string[];
    part4:string[];
    part5:string[];
}

interface CosmicAnimatePart9{
    part1:string[];
    part2:string[];
    part3:string[];
    part4:string[];
    part5:string[];
    part6:string[];
    part7:string[];
    part8:string[];
    part9:string[];
}

interface CosmicAnimateResources{
    type:string;
    // Tres partes. 3/3
    partsThree:CosmicAnimatePart3;
    partsThreeTransform:CosmicAnimatePart3;
    // Cinco partes. 5/5
    parts:CosmicAnimatePart5;
    partsTransform:CosmicAnimatePart5;
    // Nueve partes. 9/9
    partsNine:CosmicAnimatePart9;
    partsNineTransform:CosmicAnimatePart9;
}

interface CosmicAnimateValidations{
    numeric:RegExp;
    empty(data:any):boolean;
}

interface CosmicFadeOutSettings{
    mode?:string;
    spaceInLetters:number;
    time:number;
    random?:boolean;
    appear?:boolean
}

export {
    CosmicFadeOutSettings, 
    CosmicAnimateSettings, CosmicAnimateViewport, CosmicAnimateValidations, 
    CosmicAnimateResources, CosmicAnimatePart3, CosmicAnimatePart5, CosmicAnimatePart9
}