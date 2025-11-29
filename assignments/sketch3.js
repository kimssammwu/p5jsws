var ORIENTED_X;
var ORIENTED_Y;
var head_gear = 1;

function setup() {
  createCanvas(600, 400)

  ORIENTED_X = width / 2;
  ORIENTED_Y = height / 2;
  pixelDensity(1);
}



function draw() {
  const BACKGROUND_COLOR = "#8BC34A";
  const MAIN_SKIN_COLOR = "rgb(251, 206, 177)";
  
  
  background(BACKGROUND_COLOR);

  // 군복
  {
    noStroke();
    fill("rgb(87, 97, 86)");
    rect(ORIENTED_X-120, ORIENTED_Y+76, 240, 200);

    fill("rgb(143, 113, 103)");
    rect(ORIENTED_X - 60, ORIENTED_Y + 100, 10, 10);
    rect(ORIENTED_X - 50, ORIENTED_Y + 100, 10, 10);
    rect(ORIENTED_X - 50, ORIENTED_Y + 110, 10, 10);

    rect(ORIENTED_X + 20, ORIENTED_Y + 150, 2*10, 10);
    rect(ORIENTED_X + 20, ORIENTED_Y + 160, 10, 10);
    rect(ORIENTED_X + 60, ORIENTED_Y + 150, 2*10, 10);
    rect(ORIENTED_X + 70, ORIENTED_Y + 160, 10, 10);
    rect(ORIENTED_X + 40, ORIENTED_Y + 170, 2*10, 2*10);
    rect(ORIENTED_X + 30, ORIENTED_Y + 180, 4*10, 10);
    rect(ORIENTED_X + 30, ORIENTED_Y + 190, 10, 10);
    rect(ORIENTED_X + 60, ORIENTED_Y + 190, 10, 10);

    rect(ORIENTED_X + 30, ORIENTED_Y + 90, 8*10, 4*10);
    rect(ORIENTED_X + 110, ORIENTED_Y + 120, 10, 2*10);
    rect(ORIENTED_X + 80, ORIENTED_Y + 120, 2*10, 2*10);
    rect(ORIENTED_X - 80, ORIENTED_Y + 160, 3*10, 5*10);
    rect(ORIENTED_X - 50, ORIENTED_Y + 180, 3*10, 5*10);


    fill("rgb(48, 43, 47)");
    rect(ORIENTED_X - 80, ORIENTED_Y + 130, 10, 10);
    rect(ORIENTED_X - 70, ORIENTED_Y + 140, 2*10, 4*10);
    rect(ORIENTED_X - 60, ORIENTED_Y + 150, 5*10, 2*10);
    rect(ORIENTED_X + 20, ORIENTED_Y + 80, 2*10, 10);
    rect(ORIENTED_X + 30, ORIENTED_Y + 90, 2*10, 10);
    rect(ORIENTED_X + 30, ORIENTED_Y + 100, 10, 10);

    rect(ORIENTED_X + 89, ORIENTED_Y + 110, 10, 10);
    

    
    // 튀어나간 부분 지우기
    fill(BACKGROUND_COLOR);

    quad(ORIENTED_X, ORIENTED_Y, ORIENTED_X, ORIENTED_Y + 85, ORIENTED_X + 100, ORIENTED_Y + 120, ORIENTED_X + 700, ORIENTED_Y + 120);
    quad(ORIENTED_X, ORIENTED_Y, ORIENTED_X, ORIENTED_Y + 85, ORIENTED_X - 100, ORIENTED_Y + 120, ORIENTED_X - 1300, ORIENTED_Y + 120);
    quad(ORIENTED_X + 100, ORIENTED_Y + 128, ORIENTED_X + 110, ORIENTED_Y + 200, ORIENTED_X + 300, ORIENTED_Y + 200, ORIENTED_X + 300, ORIENTED_Y - 100);
    quad(ORIENTED_X - 100, ORIENTED_Y + 128, ORIENTED_X - 110, ORIENTED_Y + 200, ORIENTED_X - 300, ORIENTED_Y + 200, ORIENTED_X - 300, ORIENTED_Y - 100);


  }
  // 군복 디테일
  {
    // 목
    noStroke();
    fill(MAIN_SKIN_COLOR);

    quad( ORIENTED_X , ORIENTED_Y + 140 , ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X , ORIENTED_Y + 85 , ORIENTED_X - 15 , ORIENTED_Y + 92 );
    quad( ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X - 15 , ORIENTED_Y + 92 , ORIENTED_X - 15 , ORIENTED_Y , ORIENTED_X + 15 , ORIENTED_Y );

    // 군복 테두리
    noFill();
    stroke("black");
    strokeWeight(7);
    line( ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X + 100 , ORIENTED_Y + 120 );
    line( ORIENTED_X + 70 , ORIENTED_Y + 220 , ORIENTED_X + 100 , ORIENTED_Y + 120 );
    line( ORIENTED_X - 15 , ORIENTED_Y + 92 , ORIENTED_X - 100 , ORIENTED_Y + 120 );
    line( ORIENTED_X - 70 , ORIENTED_Y + 220 , ORIENTED_X - 100 , ORIENTED_Y + 120 );
    line( ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X + 50 , ORIENTED_Y + 140 );
    
    // 팔 라인
    line( ORIENTED_X + 100 , ORIENTED_Y + 128 , ORIENTED_X + 110 , ORIENTED_Y + 200 );
    line( ORIENTED_X - 100 , ORIENTED_Y + 128 , ORIENTED_X - 110 , ORIENTED_Y + 200 );
        
    // 목 카라
    line( ORIENTED_X - 15 , ORIENTED_Y + 92 , ORIENTED_X - 50 , ORIENTED_Y + 140 );
    line( ORIENTED_X + 50 , ORIENTED_Y + 140 , ORIENTED_X - 50 , ORIENTED_Y + 140 );
    line( ORIENTED_X - 15 , ORIENTED_Y + 92 , ORIENTED_X , ORIENTED_Y + 140 );
    line( ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X , ORIENTED_Y + 140 );
        
    // 계급장
    stroke("blue");
    strokeWeight(5);
    line( ORIENTED_X + 50 , ORIENTED_Y + 160 , ORIENTED_X + 65 , ORIENTED_Y + 160 );
    line( ORIENTED_X + 50 , ORIENTED_Y + 165 , ORIENTED_X + 65 , ORIENTED_Y + 165 );
    line( ORIENTED_X + 50 , ORIENTED_Y + 170 , ORIENTED_X + 65 , ORIENTED_Y + 170 );
    line( ORIENTED_X + 50 , ORIENTED_Y + 175 , ORIENTED_X + 65 , ORIENTED_Y + 175 );
  }


  
  // 귀
  {
    // 귀 본체
    noStroke();
    fill("rgb(255,192,151)");



    ellipse(ORIENTED_X - 100, ORIENTED_Y, 35, 50);
    ellipse(ORIENTED_X + 100, ORIENTED_Y, 35, 50);
    // 귀 디테일
    noFill();
    stroke("rgb(255,171,116)");
    strokeWeight(3);


    bezier(ORIENTED_X - 107, ORIENTED_Y - 10, 
                          ORIENTED_X - 100, ORIENTED_Y,
                          ORIENTED_X - 110, ORIENTED_Y + 10,
                          ORIENTED_X - 80, ORIENTED_Y + 20,
                          );
    bezier(ORIENTED_X + 107, ORIENTED_Y - 10, 
                          ORIENTED_X + 100, ORIENTED_Y,
                          ORIENTED_X + 110, ORIENTED_Y + 10,
                          ORIENTED_X + 80, ORIENTED_Y + 20,
                          );
  }
  
  // 얼굴 본체
  {
    noStroke();
    fill(MAIN_SKIN_COLOR);
    circle(ORIENTED_X, ORIENTED_Y-30, 200);
    fill("gray");
    arc(ORIENTED_X, ORIENTED_Y-30, 200, 200, PI, 0);
    fill(MAIN_SKIN_COLOR);
    arc(ORIENTED_X, ORIENTED_Y, 200, 200, PI+QUARTER_PI/3, -QUARTER_PI/3);
    ellipse(ORIENTED_X, ORIENTED_Y + 26, 200, 100);
  }
  
  // 눈
  {
    // 눈 흰자
    fill("white");
    noStroke();
    ellipse(ORIENTED_X - 45, ORIENTED_Y - 20, 60, 55);
    ellipse(ORIENTED_X + 45, ORIENTED_Y - 20, 60, 55);
    // 눈 흰자 튀어 나온 곳 지우기
    noFill();
    stroke(MAIN_SKIN_COLOR);
    strokeWeight(10);
    arc(ORIENTED_X+45, ORIENTED_Y-20, 70, 55, QUARTER_PI, PI-QUARTER_PI/2);
    arc(ORIENTED_X-45, ORIENTED_Y-20, 70, 55, QUARTER_PI, PI-QUARTER_PI/2);

    // 눈썹 가이드
    noFill();
    stroke("black");
    strokeWeight(5);
    arc(ORIENTED_X+45, ORIENTED_Y-20, 60, 55, PI+QUARTER_PI/2, QUARTER_PI/2);
    arc(ORIENTED_X-45, ORIENTED_Y-20, 60, 55, -(PI+QUARTER_PI/2), -(QUARTER_PI/2));
    
    strokeWeight(3);
    arc(ORIENTED_X+45, ORIENTED_Y-25, 60, 55, QUARTER_PI+QUARTER_PI/2, PI-QUARTER_PI);
    arc(ORIENTED_X-45, ORIENTED_Y-25, 60, 55, QUARTER_PI, PI-(QUARTER_PI+QUARTER_PI/2));
    
    stroke("gray");
    arc(ORIENTED_X+45, ORIENTED_Y-18, 60, 55, QUARTER_PI+QUARTER_PI/2, PI-QUARTER_PI);
    arc(ORIENTED_X-45, ORIENTED_Y-18, 60, 55, QUARTER_PI, PI-(QUARTER_PI+QUARTER_PI/2));

    // 눈동자
    let dx_left_eye =  constrain(mouseX - (ORIENTED_X + 35), -25, 5);
    let dy_left_eye =  constrain(mouseY - (ORIENTED_Y - 25), -5, 15);
    let dx_right_eye = constrain(mouseX - (ORIENTED_X - 35), -5, 25);
    let dy_right_eye = constrain(mouseY - (ORIENTED_Y - 25), -5, 15);
    if (mouseIsPressed) {
      dx_left_eye = 5;
      dy_left_eye = 15;
      dx_right_eye = 25;
      dy_right_eye = 15;
    }
    fill("rgb(32,25,25)");
    circle(ORIENTED_X+35 + dx_right_eye, ORIENTED_Y - 25 + dy_right_eye, 20);
    circle(ORIENTED_X-35 + dx_left_eye, ORIENTED_Y-25 + dy_left_eye, 20);
    noStroke();
    fill("white");
    circle(ORIENTED_X+38 + dx_right_eye, ORIENTED_Y-25 + dy_right_eye, 5);
    circle(ORIENTED_X-32 + dx_left_eye, ORIENTED_Y-25 + dy_left_eye, 5);
  }
  
  // 입
  {
    noFill();
    stroke("black");
    strokeWeight(5);
    arc(ORIENTED_X, ORIENTED_Y+50, 10, 10, PI, -QUARTER_PI);
  }
  
  // 안경
  {
    stroke("black");
    strokeWeight(7);
    fill("#C2C7FF47")
    circle(ORIENTED_X-48, ORIENTED_Y-20, 80);
    circle(ORIENTED_X+48, ORIENTED_Y-20, 80);
    noFill();
    arc(ORIENTED_X, ORIENTED_Y-20, 15, 15, PI, 0);

    line( ORIENTED_X - 90 , ORIENTED_Y - 30 , ORIENTED_X - 100 , ORIENTED_Y - 28 );
    line( ORIENTED_X + 90 , ORIENTED_Y - 30 , ORIENTED_X + 100 , ORIENTED_Y - 28 );
  }
 
  
  // 얼굴 테두리
  {
    noFill();
    stroke("black");
    strokeWeight(7);
    line( ORIENTED_X + 15 , ORIENTED_Y + 92 , ORIENTED_X + 15 , ORIENTED_Y + 80 );
    line( ORIENTED_X - 15 , ORIENTED_Y + 92 , ORIENTED_X - 15 , ORIENTED_Y + 80 );
    
    arc(ORIENTED_X, ORIENTED_Y+26, 200, 100, 0, PI);
    arc(ORIENTED_X+100, ORIENTED_Y, 35, 50, 0-HALF_PI, HALF_PI);
    arc(ORIENTED_X-100, ORIENTED_Y, 35, 50, HALF_PI, -HALF_PI);
    arc(ORIENTED_X, ORIENTED_Y-30, 200, 200, PI, 0);
    
    // arc()
    // quad(315, 292, 600-315, 292, 600-315, 200, 315, 200);
  }

  // 전역
  textSize(32);
  stroke(0);
  strokeWeight(4);
  if (!mouseIsPressed) {
    fill(255);
    text('전역', mouseX-32, mouseY+16);
  } else {
    fill(255, 0, 0);
    text("하사지원", mouseX-64, mouseY+16);
  }

  // 모자
  {
    if (head_gear === 0) { return ; }
    if (head_gear === 1) {
      fill("rgb(87, 97, 86)");
    } else {
      fill("rgba(65, 75, 172, 1)");
    }

    beginShape();
    vertex(ORIENTED_X-68, ORIENTED_Y-100);
    bezierVertex(ORIENTED_X-118, ORIENTED_Y-80, ORIENTED_X-18, ORIENTED_Y-40, ORIENTED_X+52, ORIENTED_Y-100);
    endShape(CLOSE);

    beginShape();
    vertex(ORIENTED_X-68, ORIENTED_Y-100);
    bezierVertex(ORIENTED_X-58, ORIENTED_Y-150, ORIENTED_X, ORIENTED_Y-200, ORIENTED_X+52, ORIENTED_Y-100);
    endShape(CLOSE);

    if (head_gear === 1) {
      // 계급장
      stroke("blue");
      strokeWeight(4);
      line( ORIENTED_X-30, ORIENTED_Y-115, ORIENTED_X-10, ORIENTED_Y-115);
      line( ORIENTED_X-30, ORIENTED_Y-120, ORIENTED_X-10, ORIENTED_Y-120);
      line( ORIENTED_X-30, ORIENTED_Y-125, ORIENTED_X-10, ORIENTED_Y-125);
      line( ORIENTED_X-30, ORIENTED_Y-130, ORIENTED_X-10, ORIENTED_Y-130);
    }
  }



}

function mouseMoved() {
  let dx = width / 2 + constrain(mouseX / 15, -20, 20);
  let dy = height / 2 + constrain(mouseY / 15, -20, 20);
  ORIENTED_X = dx;
  ORIENTED_Y = dy;
}

function keyPressed() {
  if (key === '1') { head_gear = 1; }
  else if (key === '2') { head_gear = 2; }
  else if (key === '3') { head_gear = 0; };

  if (key === 's') {
    saveGif('test.gifs', 10);
  }
}