song="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
scorel=0;
scorer=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();

video=createCapture(VIDEO);
video.hide();
model=ml5.poseNet(video, modelLoaded);
model.on('pose', gotPoses);
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    scorel=results[0].pose.keypoints[9].score;
    scorer=results[0].pose.keypoints[10].score;
    console.log("Scoreleftwrist = "+ scorel);
    console.log("Scorerightwrist = "+ scorer);
    leftx=results[0].pose.leftWrist.x;
    lefty=results[0].pose.leftWrist.y;

    rightx=results[0].pose.rightWrist.x;
    righty=results[0].pose.rightWrist.y;

    console.log("LeftWristx = " + leftx +" leftwristy = "+lefty);
    console.log("RightWristx = " + rightx +" rightwristy = "+righty);
}

}

function modelLoaded(){
    console.log("Pose Net is Started")
}

function draw(){
    image(video,0,0,600,500);
    
    fill("red");
    stroke("red");
    if(scorel>0.2){
    circle(leftx,lefty,20);
    inlefty=Number(lefty);
    volume=floor(inlefty)/500;
    document.getElementById("v").innerHTML="Volume = "+volume;
    song.setVolume(volume)
    }
    if(scorer>0.2){
        circle(rightx,righty,20);
        
        if(righty >0 && righty <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(righty >100 && righty <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(righty >200 && righty <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(righty >300 && righty <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(righty >400 && righty <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}
function stop(){
    song.stop();
}
function pause(){
    song.pause();
}
