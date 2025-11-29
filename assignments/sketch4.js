let colorItems = [];
let toggle = true;
let tempNumberStorage = 0;

let animationQueue = [];
let endedJ = -1;
let endedI = -1;


var TimeObject = () => {
  var timezone;
  var progress;
  var publicAPI = {
    updateCurrentState: (timezone, progress) => {this.timezone = timezone; this.progress = progress;},
    getTimezone: () => this.timezone,
    getProgress: () => this.progress,
  }
  return publicAPI;
};


var current = TimeObject();


const _stroke = (_color) => {
  stroke(_color);
  if (!alpha(_color) == 255) return;
  if (TIMEZONE[current.getTimezone()] == TIMEZONE.SUNSET) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0, 0.4)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    stroke(darkenColor)
  } else if (TIMEZONE[current.getTimezone()] == TIMEZONE.DAWN) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0.3, 0)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    stroke(darkenColor)
  } else if (TIMEZONE[current.getTimezone()] == TIMEZONE.LAST_DAWN) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0.4, 0.8)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    stroke(darkenColor)
  }
}
const _fill = (_color) => {
  fill(_color);
  if (_color == "palegreen") return;
  if (!alpha(_color) == 255) return;
  if (TIMEZONE[current.getTimezone()] == TIMEZONE.SUNSET) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0, 0.4)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    fill(darkenColor)
  } else if (TIMEZONE[current.getTimezone()] == TIMEZONE.DAWN) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0.3, 0)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    fill(darkenColor)
  } else if (TIMEZONE[current.getTimezone()] == TIMEZONE.LAST_DAWN) {
    let darkenAmt = map(current.getProgress(), 0, 100, 0.4, 0.8)
    let darkenColor = lerpColor(color(_color), color(0, 0, 0), darkenAmt);
    fill(darkenColor)
  }
}


let CUSTOM_FRAME_RATE = 60;
const TIMEZONE = {
  DAWN: 0,
  NOON: 1,
  SUNSET: 2,
  LAST_DAWN: 3,
  0: "DAWN",
  1: "NOON",
  2: "SUNSET",
  3: "LAST_DAWN"
};








function setup() {
  let dawnColor = color("#0a1428");
  let noonColor = color("#528CBE");
  let sunsetColor = color("#ED6A40");
  colorItems = [dawnColor, noonColor, sunsetColor, dawnColor, dawnColor];

  createCanvas(600, 400);
  
  background(sunsetColor);
  frameRate(CUSTOM_FRAME_RATE);
}


function draw() {
  if (frameCount % (CUSTOM_FRAME_RATE - 10) == 0) {toggle = 1 - toggle;}
  
  // background(colorItems[0]);
  // [과제 4]에서 동적인 변화 설정을 위한 환경 세팅
  // * 시간 관련된 변수는 current 객체가 관리하게 하자!
  let spendTime = (frameCount / CUSTOM_FRAME_RATE) % 10;
  
  let colorItemIdx = Math.floor(map(spendTime % 10, 0, 10, 0, 4));
  let lerpValue = map(spendTime%2.5, 0, 2.5, 0, 1);
  
  
  const currentBgColor = lerpColor(
    colorItems[colorItemIdx],
    colorItems[colorItemIdx+1],
    lerpValue
  );
  current.updateCurrentState(TIMEZONE[colorItemIdx], Math.round(lerpValue * 100))

  background(currentBgColor);
  noStroke();
  

  
  // TODO: [과제 4] 움직이는 오브젝트 추가 필요
  
  
  // [과제4] 바닥에 깔리는 그림자들 먼저 그리기 
  {
    let currentTimezone = current.getTimezone();
    let currentProgress = current.getProgress();
    push();


    
    // 컴퓨터 그림자 설정
    {
      let shadowColor = `rgba(29, 3, 3, 0.3)`;
      _fill(shadowColor); noStroke();
      
      if (TIMEZONE[currentTimezone] == TIMEZONE.DAWN) {
        let w_pad = (-120) * (currentProgress) / 100;
        let h_pad = (-70) * (currentProgress) / 100;
        quad(
          ...[150, 220],
          ...[270+150+w_pad, 280+50+h_pad],
          ...[104, 363],
          ...[-16, 248.5],
        )
      }
      else if (TIMEZONE[currentTimezone] == TIMEZONE.NOON) {
        let w_pad = (-120) * (currentProgress) / 100;
        let h_pad = (-70) * (currentProgress) / 100;
        quad(
          ...[150, 220],
          ...[301.2+w_pad, 260.7+h_pad],
          ...[104, 363],
          ...[-16, 248.5],
        )
      }
      else if (TIMEZONE[currentTimezone] == TIMEZONE.SUNSET) {
        let shadowDist = map(currentProgress, 0, 100, 0, 42);

        let fadeout = map(current.getProgress(), 0, 90, 0, 1);
        let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
        fill(fadeoutColor); noStroke();
        
        triangle(
          104, 363,
          0, 308+shadowDist,
          0, 308
        )
      } 
      
    }
    
    // 키보드 그림자 설정
    {
      // [키보드] 새벽
      if (TIMEZONE[currentTimezone] == TIMEZONE.DAWN) {
        let rawAlpha = map(currentProgress, 0, 100, 0.01, 0.3);
        let alphaRounded = Math.round(rawAlpha * 100) / 100;

        let shadowColor = `rgba(29, 3, 3, ${alphaRounded})`;
        _fill(shadowColor); noStroke();
        
        let w_pad = (-20) * (currentProgress) / 100;
        let h_pad = (-30) * (currentProgress) / 100;
        quad(
          ...[270, 315+20],  // 키보드 상판 위쪽 모서리
          ...[444+w_pad, 402+h_pad],  // 키보드 앞판 아래쪽 모서리
          ...[135, 458.5],  // 키보드 상판 아래쪽 모서리
          ...[59, 420.5],  // 키보드 앞판 안쪽 모서리
        )
      }
      // [키보드] 정오
      else if (TIMEZONE[currentTimezone] == TIMEZONE.NOON) {
        let shadowColor = `rgba(29, 3, 3, 0.3)`;
        _fill(shadowColor); noStroke();
      
        let w_pad = (-80) * (currentProgress) / 100;
        let h_pad = (-10) * (currentProgress) / 100;
        
        quad(
          ...[270, 315+20],  // 키보드 상판 위쪽 모서리
          ...[424+w_pad, 372+h_pad],  // 이전 마지막 그림자
          ...[135, 458.5],  // 키보드 상판 아래쪽 모서리
          ...[59, 420.5],  // 키보드 앞판 안쪽 모서리
        )
      } 

      // [키보드] 노을
      else if (TIMEZONE[currentTimezone] == TIMEZONE.SUNSET) {
        let shadowColor = `rgba(29, 3, 3, 0.3)`;
        _fill(shadowColor); noStroke();

        let fadeout = map(current.getProgress(), 0, 90, 0, 1);
        let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
        fill(fadeoutColor); noStroke();
        
        let w_pad = (-100) * (currentProgress) / 100;
        let h_pad = (20) * (currentProgress) / 100;
        
        quad(
          ...[270+w_pad, 315+h_pad],  // 키보드 상판 위쪽 모서리
          ...[59+w_pad, 420.5+h_pad],  // 키보드 앞판 안쪽 모서리
          ...[135, 458.5],  // 키보드 상판 아래쪽 모서리
          ...[345, 362],  // 이전 마지막 그림자
        )
      } 
      
    }
    
    // 커피잔 그림자 설정
    {  
      let shadowColor = `rgba(29, 3, 3, 0.3)`;
      _fill(shadowColor); noStroke();
      
      if (TIMEZONE[currentTimezone] == TIMEZONE.DAWN) {
        let additinalArc = -QUARTER_PI/4 -QUARTER_PI * currentProgress / 100;
        let timeScaleRate = map(currentProgress, 0, 100, 2.2, 1.5)
        arc(510, 293, 132*timeScaleRate, 66*timeScaleRate, additinalArc, 2*QUARTER_PI/1.5 + additinalArc);
      }
      else if (TIMEZONE[currentTimezone] == TIMEZONE.NOON) {
        let additinalArc = -0.9738937226128359 -QUARTER_PI/4 -QUARTER_PI * currentProgress / 100;
        let timeScaleRate = map(currentProgress, 0, 100, 1.5, 0.7)
        arc(510, 293, 132*timeScaleRate, 66*timeScaleRate, additinalArc, 2*QUARTER_PI/1.5 + additinalArc);
      }
      else if (TIMEZONE[currentTimezone] == TIMEZONE.SUNSET) {
        let additinalArc = HALF_PI*2/3 -QUARTER_PI * currentProgress / 100;
        let timePosRate = map(currentProgress, 0, 100, 5, 1.5);
        let fadeout = map(currentProgress, 0, 90, 0, 1);
        let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
        fill(fadeoutColor); noStroke();
        arc(510, 293, 132*2, 66*2, PI-QUARTER_PI/(1.5)+additinalArc, PI+QUARTER_PI/(timePosRate)+additinalArc);
      }
      
    }
    
    // 주판 그림자 설정
    {
      let shadowColor = `rgba(29, 3, 3, 0.3)`;
      _fill(shadowColor); noStroke();
      if (TIMEZONE[currentTimezone] == TIMEZONE.SUNSET) {
        let fadeout = map(currentProgress, 0, 90, 0, 1);
        let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
        fill(fadeoutColor); noStroke();
        let shadowDist = map(currentProgress, 0, 100, 0, 30);
        quad(
          410, 202,
          342, 198-30+shadowDist,
          271, 163-30+shadowDist,
          271, 132
        );
      } 
    }
    pop();
    
  }
    
  
  
  
  
  // 문서랑 주판
  {
    // 문서
    _fill("rgb(211,203,193)");
    quad(...isoTop(GRIDUNIT(10), GRIDUNIT(-5), GRIDUNIT(5.6)+1, GRIDUNIT(3.4)+1));
    _fill("rgb(252,239,223)");
    quad(...isoTop(GRIDUNIT(10.2), GRIDUNIT(-5.2), GRIDUNIT(5.6)+1, GRIDUNIT(3.4)+1));


    
    // 주판
    _fill("rgb(224,224,224)");
    quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-2.5), GRIDUNIT(7)+1, QUARTERUNIT()/2+1));
    
    
    if (TIMEZONE[current.getTimezone()] < TIMEZONE.LAST_DAWN) {
      // 윗판
      _fill("#553A30");
      quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-3.5), GRIDUNIT(7)+1, QUARTERUNIT()+1));
      quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-1), GRIDUNIT(7)+1, QUARTERUNIT()+1));
      quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-3.5), HALFUNIT()+1, GRIDUNIT(2.5)+1));
      quad(...isoTop(GRIDUNIT(12.5), GRIDUNIT(-3.5), HALFUNIT()+1, GRIDUNIT(2.5)+1));

      _fill("#2E1A13");
      quad(...isoLeft(GRIDUNIT(6), GRIDUNIT(-0.75), GRIDUNIT(7)+1, HALFUNIT(1)+1));
      _fill("#64493F");
      quad(...isoRight(GRIDUNIT(13), GRIDUNIT(-4+0.475), GRIDUNIT(2.73)+1, HALFUNIT(1)+1));      

      if (frameCount % 10 === 0) {
          let wholeCnt = 0;
          for (let j = 0; j < 11; j++) {
              for (let i = -1; i < 4; i++) {
                  if (i == 0) continue;
                  if (wholeCnt == tempNumberStorage) {
                    animationQueue.push({ j, i, life: 3 });
                    wholeCnt++;

                    break
                  };
                  wholeCnt++;
              }
          }
          tempNumberStorage++;
      }

      for (let idx = animationQueue.length - 1; idx >= 0; idx--) {
          let item = animationQueue[idx];

          if (frameCount % 4 === 0) {item.life--};

          let { j, i, life } = item;

          _fill("#B48574");
          drawIsoEllipseLeft(
              GRIDUNIT(6.4) + HALFUNIT(j-life),
              GRIDUNIT(-3.2) + HALFUNIT(1 + 0.8 * i - life),
              QUARTERUNIT(2),
              QUARTERUNIT(2)
          );

          _fill("#946B5C");
          drawIsoEllipseLeft(
              GRIDUNIT(6.65) + HALFUNIT(j-life),
              GRIDUNIT(-2.95) + HALFUNIT(1 + 0.8 * i - life),
              QUARTERUNIT(),
              QUARTERUNIT()
          );


          if (item.life <= 0) {
              endedJ = j;
              endedI = i;
              animationQueue.splice(idx, 1);
          }
      }

      for (let j=0; j<=endedJ; j++) {
        for (let i=-1; i<4; i++) {
          if(i==0) { continue;};
          if (j == endedJ && i > endedI) {break}
          _fill("#B48574");
          drawIsoEllipseLeft(GRIDUNIT(6.4)+HALFUNIT(j), GRIDUNIT(-3.2)+HALFUNIT(1+0.8*i), QUARTERUNIT(2), QUARTERUNIT(2));
          _fill("#946B5C");
          drawIsoEllipseLeft(GRIDUNIT(6.65)+HALFUNIT(j), GRIDUNIT(-2.95)+HALFUNIT(1+0.8*i), QUARTERUNIT(), QUARTERUNIT());
          }
        }
      _fill("#553A30");
      quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-1), GRIDUNIT(7)+1, QUARTERUNIT()+1));

    } else {
      // 일반적으로 주판 그리기
      for (let j=0; j<11; j++) {
        for (let i=-1; i<4; i++) {
          if(i==0) { continue;};
          _fill("#B48574");
          drawIsoEllipseLeft(GRIDUNIT(6.4)+HALFUNIT(j), GRIDUNIT(-3.2)+HALFUNIT(1+0.8*i), QUARTERUNIT(2), QUARTERUNIT(2));
          _fill("#946B5C");
          drawIsoEllipseLeft(GRIDUNIT(6.65)+HALFUNIT(j), GRIDUNIT(-2.95)+HALFUNIT(1+0.8*i), QUARTERUNIT(), QUARTERUNIT());
        }
      }
      
    // 윗판
    _fill("#553A30");
    quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-3.5), GRIDUNIT(7)+1, QUARTERUNIT()+1));
    quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-1), GRIDUNIT(7)+1, QUARTERUNIT()+1));
    quad(...isoTop(GRIDUNIT(6), GRIDUNIT(-3.5), HALFUNIT()+1, GRIDUNIT(2.5)+1));
    quad(...isoTop(GRIDUNIT(12.5), GRIDUNIT(-3.5), HALFUNIT()+1, GRIDUNIT(2.5)+1));
    
    _fill("#2E1A13");
    quad(...isoLeft(GRIDUNIT(6), GRIDUNIT(-0.75), GRIDUNIT(7)+1, HALFUNIT(1)+1));
    _fill("#64493F");
    quad(...isoRight(GRIDUNIT(13), GRIDUNIT(-4+0.475), GRIDUNIT(2.73)+1, HALFUNIT(1)+1));
      
    }

    

  
  }

  [drawCoffeeSet, drawComputer, drawKeyboard].forEach((module) => {
    push();
    module();
    pop();
  })
  
  isoRightText('$ watch -n 1 date +"%', 220, 110);
  isoRightText(new Date().toLocaleDateString(), 240, 130);
  isoRightText(getTimeString(), 260, 150);
  isoRightText((toggle ? "_" : ""), 280, 170);
  

    
}


  
function getTimeString() {
  const d = new Date();

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}

  
  
  
function drawComputer() {
  // 본체 윗면
  _fill("rgb(180,133,77)");
  quad(...isoTop(GRIDUNIT(6), GRIDUNIT(3), GRIDUNIT(6)+1, GRIDUNIT(5.5)+1));
  {
    // 그림자
    if (TIMEZONE[current.getTimezone()] === TIMEZONE.SUNSET) {
      push();

      let shadowColor = `rgba(29, 3, 3, 0.3)`;
      _fill(shadowColor); noStroke();

      let fadeout = map(current.getProgress(), 0, 90, 0, 1);
      let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
      fill(fadeoutColor); noStroke();
      
      clip(() => quad(...isoTop(GRIDUNIT(6), GRIDUNIT(3), GRIDUNIT(6)+1, GRIDUNIT(5.5)+1)));
      
      let shadowDepth = map(current.getProgress(), 0, 100, 0, 3);
      triangle(
        54, 271.2,
        100, 271,
        // 105-GRIDUNIT(4.3), 308-GRIDUNIT(shadowDepth),
        100-current.getProgress()*2.5, 271.2-current.getProgress()*2,
      );
      pop();
    }
    // return;
  }
  
  _fill("rgb(155,112,61)");
  quad(...isoLeft(GRIDUNIT(3), GRIDUNIT(3.25), GRIDUNIT(3)+1, GRIDUNIT(3)+1));
  // 본체 좌측면
  quad(...isoLeft(GRIDUNIT(0), GRIDUNIT(8.5), GRIDUNIT(12)+1, GRIDUNIT(1.5)+1));

  // 286 PC 윗면
  _fill("rgb(205,167,120)");
  quad(...isoTop(GRIDUNIT(3), GRIDUNIT(-1.75), GRIDUNIT(3)+1, GRIDUNIT(5)+1));
  {
    // 그림자
    if (TIMEZONE[current.getTimezone()] === TIMEZONE.SUNSET) {
      push();
      let shadowColor = `rgba(29, 3, 3, 0.3)`;
      _fill(shadowColor); noStroke();

      let fadeout = map(current.getProgress(), 0, 90, 0, 1);
      let fadeoutColor = lerpColor(color(shadowColor), color(0,0,0,0), fadeout);
      fill(fadeoutColor); noStroke();
      
      clip(() => quad(...isoTop(GRIDUNIT(3), GRIDUNIT(-1.75), GRIDUNIT(3)+1, GRIDUNIT(5)+1)));
      triangle(
        82.5, 139.75,
        82.5-GRIDUNIT(map(current.getProgress(), 0, 100, 0, 30)), 139.75,
        233.5, 64.25-GRIDUNIT(0.75),
      );
      pop();
    }
  }
  quad(...isoTop(GRIDUNIT(5), GRIDUNIT(-3), GRIDUNIT(1), GRIDUNIT(6)));
  
  //모니터 좌측면 하이라이팅
  _fill("#DBCEAB");
  quad(...isoLeft(GRIDUNIT(5.1), GRIDUNIT(3.3), GRIDUNIT(1)+1, GRIDUNIT(4)+1));
  //모니터 좌측면
  _fill("rgb(180,133,77)");
  quad(...isoLeft(GRIDUNIT(5), GRIDUNIT(3), GRIDUNIT(1)+1, GRIDUNIT(4)+1));
  
  _fill("#DBCEAB");
  quad(...isoRight(GRIDUNIT(6), GRIDUNIT(-3), GRIDUNIT(6)+1, GRIDUNIT(4)+1));
  // 컴퓨터 바닥 앞면
  quad(...isoRight(GRIDUNIT(12), GRIDUNIT(3), GRIDUNIT(5.5)+1, GRIDUNIT(1.5)+1));
  
  // 화면
  _fill("rgb(50, 51, 67)");
  quad(...isoRight(GRIDUNIT(6.6), GRIDUNIT(-2.2), GRIDUNIT(5.3)+1, GRIDUNIT(3.3)+1));
};
  
function drawKeyboard() {
    _fill("rgb(201,151,92)");
    quad(...isoTop(GRIDUNIT(15), GRIDUNIT(6), GRIDUNIT(2.5)+1, GRIDUNIT(7)+1));
  
    _fill("rgb(194,174,149)");
    for (let i=0; i <= 10; i++) {
      quad(...isoTop(GRIDUNIT(15) + QUARTERUNIT(1.5), GRIDUNIT(6) + QUARTERUNIT() + HALFUNIT(i), GRIDUNIT(0.3)+1, GRIDUNIT(0.3)+1));
      quad(...isoTop(GRIDUNIT(15) + QUARTERUNIT(3.5), GRIDUNIT(6) + QUARTERUNIT() + HALFUNIT(i), GRIDUNIT(0.3)+1, GRIDUNIT(0.3)+1));
      if (i >= 2) {
        quad(...isoTop(GRIDUNIT(15) + QUARTERUNIT(5.5), GRIDUNIT(6) + QUARTERUNIT() + HALFUNIT(i), GRIDUNIT(0.3)+1, GRIDUNIT(0.3)+1));
      }
      quad(...isoTop(GRIDUNIT(15) + QUARTERUNIT(7.5), GRIDUNIT(6) + QUARTERUNIT() + HALFUNIT(i), GRIDUNIT(0.3)+1, GRIDUNIT(0.3)+1));    
    }
    quad(...isoTop(GRIDUNIT(15) + QUARTERUNIT(7.5), GRIDUNIT(6) + QUARTERUNIT() + HALFUNIT(4), GRIDUNIT(0.3)+1, GRIDUNIT(1.5)+1));
    
    _fill("#DAAA71");
    quad(...isoRight(GRIDUNIT(17.5), GRIDUNIT(10), GRIDUNIT(-4.05) + 1, GRIDUNIT(0.5) + 1));

  }
  
function drawCoffeeSet() {
  noStroke();
  const applyShadow = (shadow) => {_fill(shadow);noStroke();}
  
  function mugCupWidth(y) {
    // if (y < 0 || y > 100) {throw new Error("y must be between 0 and 100");}
    const baseRadius = 0.5;
    const topRadius = 1.5;
    const a = topRadius - baseRadius;
    return baseRadius + a * Math.pow(y / 100, 2);;
  }
  
    
  _fill("rgb(211,203,193)");
  drawIsoEllipse(GRIDUNIT(16), GRIDUNIT(-1), GRIDUNIT(4.5), GRIDUNIT(4.5));
  applyShadow("rgb(190,187,183)");
  arc(510, 293, 132, 66, PI-QUARTER_PI/2, PI+QUARTER_PI);
  applyShadow("rgba(138,133,127,0.47)");
  arc(510, 293, 132/1.75, 66/1.75, 0-QUARTER_PI, PI+QUARTER_PI);
  noStroke();
    
  _fill("rgb(252,239,223)");
  drawIsoEllipse(GRIDUNIT(17.25), GRIDUNIT(0.25), GRIDUNIT(2), GRIDUNIT(2));
  drawIsoEllipse(GRIDUNIT(17.125), GRIDUNIT(0.125), GRIDUNIT(2), GRIDUNIT(2));
    
  for (let i = 0; i < 100; i++) {
    if (i % 2) { continue}
    // let d = (0.5 - f(i)) * 2
    let d = mugCupWidth(i);
    let m = (i*0.024) + 0.6;
    drawIsoEllipse(GRIDUNIT(17.125-m), GRIDUNIT(0.125-m), GRIDUNIT(2+d), GRIDUNIT(2+d));
  }
  noFill();
  _stroke("rgb(252,239,223)");
  strokeWeight(10);
  ellipse(550, 254, 38, 50);
  noStroke();
  
    
  _fill("rgb(224,222,218)");
  drawIsoEllipse(GRIDUNIT(17.125-2.7), GRIDUNIT(0.125-2.7), GRIDUNIT(2.9), GRIDUNIT(2.9));
  drawIsoEllipse(GRIDUNIT(17.125-2.6), GRIDUNIT(0.125-2.6), GRIDUNIT(2.8), GRIDUNIT(2.8));
      
  _fill("rgb(78,57,49)");
  drawIsoEllipse(GRIDUNIT(17.125-2.15), GRIDUNIT(0.125-2.15), GRIDUNIT(2.2), GRIDUNIT(2.2));

}

  
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10);
  }
}
  
  
  
function isoRightText(str, x, y) {
  push();

  const [ix, iy] = toIsometric(x, y);

  textFont('Courier New', 10);
  textStyle(BOLD);
  _fill("palegreen")
    
  translate(ix, iy);
  shearY(-PI / 6.5);
  textSize(12);

  text(str, 0, 0);

  pop();
}
  


function GRIDUNIT(length=1) { return 30 * length; }
function HALFUNIT(length=1) { return GRIDUNIT()/2 * length; }
function QUARTERUNIT(length=1) { return GRIDUNIT()/4 * length; }


function toIsometric(x, y) {
  return [ x-y, (x+y)/2 ];
}

function drawIsoEllipseLeft(x, y, w, h, startAngle=0, endedAngle=PI*2) {
  let points = isoLeft(x, y, w, h);
  let cx = points[0] + (points[4] - points[0]) / 2 ;
  let cy = points[1] + (points[5] - points[1]) / 2 ;
  let wei = (points[2] - points[0]) / 2
  let hei = (points[5]-points[3]) / 2;
  // _fill(c);
  arc(cx, cy, 2*wei, 2*hei, startAngle, endedAngle)
}

function drawIsoEllipse(x, y, w, h) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  const [cx, cy] = toIsometric(centerX, centerY);
  const isoW = w;
  const isoH = h * 0.5;
  arc(cx, cy, isoW, isoH, 0, TWO_PI);
}

// isometric top side
function isoTop(x, y, w, h) {
  const p1 = toIsometric(x, y);
  const p2 = toIsometric(x + w, y);
  const p3 = toIsometric(x + w, y + h);
  const p4 = toIsometric(x, y + h);
  return [...p1, ...p2, ...p3, ...p4];
}

// isometric left side
function isoLeft(x, y, w, h) {
  y -= h   // 실험적 수치;
  const top = isoTop(x, y, w, w);
  const p1 = toIsometric(x, y + h);
  const p2 = toIsometric(x + w, y + h);
  const p3 = [p2[0], p2[1] + h * 1.2];
  const p4 = [p1[0], p1[1] + h * 1.2];
  return [...p1, ...p2, ...p3, ...p4];
}

// isometric right side
function isoRight(x, y, w, h) {
  const p1 = toIsometric(x, y);
  const p2 = toIsometric(x, y + w);
  const p3 = [p2[0], p2[1]+h * 1.2];
  const p4 = [p1[0], p1[1]+h * 1.2];
  return [...p1, ...p2, ...p3, ...p4];
}
