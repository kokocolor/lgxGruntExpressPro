var img = new Image();
 
img.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
         
    ctx.drawImage(img,0,0,canvas.width,canvas.height);        
    var dataURL = canvas.toDataURL('image/png');
  
}

img.crossOrigin = 'Anonymous';
img.src = "../img/midnight.jpg";


function changes(){
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	
	 
	for (var i=0;i<imgData.data.length;i+=4){
		// if(i%(8)==0){
		// 	imgData.data[i]=255;
		//     imgData.data[i+1]=255;
		// 	imgData.data[i+2]=255;
		// 	i=i+8;
		// 	continue;
		// }
 
	  imgData.data[i]=imgData.data[i]-30;
	  imgData.data[i+1]=imgData.data[i+1]-70;
	  imgData.data[i+2]=imgData.data[i+2]-120;
	  imgData.data[i+3]=255;
	  
	}

	ctx.putImageData(imgData,0,0);
}

$(function(){
	var desginClick=0;
	$("body").click(function(){
		 
		changes();
	})

	$(".design").click(function(){
		if(desginClick==0){
			desginClick=1;
			$(this).text('Tel:15210827137');
		}else{
			desginClick=0;
			$(this).text('设计者:故乡');
		}
		
	})
	 

}) 

 