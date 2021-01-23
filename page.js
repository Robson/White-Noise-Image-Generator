function rand(min, max) {
	return min + ~~(Math.random() * (1 + max - min))
}

function generate() {
	var canvas = document.getElementById('noisy');
	var lengthH = document.getElementById('lengthH').value;
	var lengthV = document.getElementById('lengthV').value;
	var size = document.getElementById('size').value;
	var context = canvas.getContext('2d');
	var colours = d3.select("#colours").node().value;
	
	d3.select('#noisy').attr('width', lengthH * size).attr('height', lengthV * size).style('display', 'none');	
	d3.select('#output').attr('width', lengthH * size).attr('height', lengthV * size).style('display', 'block');	
	
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, lengthH * size, lengthV * size);

	for (var x = 0; x < lengthH; x++) {
		for (var y = 0; y < lengthV; y++) {
			switch (colours) {
				case 'monochrome':
					if (Math.random() > .5) {				
						context.fillStyle = '#000000';
						context.fillRect(x * size, y * size, size, size);
					}							
					break;
				case 'greyscale':
					var grey = rand(0, 255);
					context.fillStyle = 'rgb(' + grey + ',' + grey + ',' + grey + ')';
					context.fillRect(x * size, y * size, size, size);
					break;	
				case 'rgb_3bit':
					context.fillStyle = 'rgb(' + rand(0, 1) * 255 + ',' + rand(0, 1) * 255 + ',' + rand(0, 1) * 255 + ')';
					context.fillRect(x * size, y * size, size, size);
					break;
				case 'rgb_6bit':
					context.fillStyle = 'rgb(' + rand(0, 3) * 85 + ',' + rand(0, 3) * 85 + ',' + rand(0, 3) * 85 + ')';
					context.fillRect(x * size, y * size, size, size);
					break;								
				case 'rgb_12bit':
					context.fillStyle = 'rgb(' + rand(0, 5) * 51 + ',' + rand(0, 5) * 51 + ',' + rand(0, 5) * 51 + ')';
					context.fillRect(x * size, y * size, size, size);
					break;								
				case 'rgb_24bit':
					context.fillStyle = 'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')';
					context.fillRect(x * size, y * size, size, size);
					break;
				case 'red':
					context.fillStyle = 'rgb(' + rand(10, 255) + ',0,0)';
					context.fillRect(x * size, y * size, size, size);
					break;						
				case 'green':
					context.fillStyle = 'rgb(0,' + rand(10, 255) + ',0)';
					context.fillRect(x * size, y * size, size, size);
					break;	
				case 'blue':
					context.fillStyle = 'rgb(0,0,' + rand(10, 255) + ')';
					context.fillRect(x * size, y * size, size, size);
					break;	
				case 'light':
					context.fillStyle = 'rgb(' + rand(128, 255) + ',' + rand(128, 255) + ',' + rand(128, 255) + ')';
					context.fillRect(x * size, y * size, size, size);
					break;
				case 'dark':
					context.fillStyle = 'rgb(' + rand(0, 128) + ',' + rand(0, 128) + ',' + rand(0, 128) + ')';
					context.fillRect(x * size, y * size, size, size);
					break;				
				case 'space_greyscale':
					var grey = rand(0, 30);
					context.fillStyle = 'rgb(' + grey + ',' + grey + ',' + grey + ')';
					context.fillRect(x * size, y * size, size, size);
					break;	
				case 'space_all':
					context.fillStyle = 'rgb(' + rand(0, 30) + ',' + rand(0, 30) + ',' + rand(0, 30) + ')';
					context.fillRect(x * size, y * size, size, size);
					break;									
			}
		}
	}
	
	var dataURL = canvas.toDataURL();
	document.getElementById('output').src = dataURL;
}

function stats() {
	var lengthH = document.getElementById('lengthH').value;
	var lengthV = document.getElementById('lengthV').value;
	var size = document.getElementById('size').value;
	var uhoh = lengthH * size >= 5000 || lengthV * size >= 5000;
	d3.select('#generate').attr('value', "Generate (" + lengthH * size + "x" + lengthV * size + ")");
	d3.select('#warning').style('display', uhoh ? 'inline' : 'none');
	d3.select('#generate').style('color', uhoh ? 'red' : 'black');
}

stats();
generate();