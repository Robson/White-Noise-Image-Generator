function rand(min, max) {
	return min + ~~(Math.random() * (1 + max - min))
}

function randArray(array) {
	return array[rand(0, array.length - 1)];
}

function generate() {
	var canvas = document.getElementById('noisy');
	var lengthH = document.getElementById('lengthH').value;
	var lengthV = document.getElementById('lengthV').value;
	var size = document.getElementById('size').value;
	var context = canvas.getContext('2d');
	var colours = d3.select("#colours").node().value;
	var bias = d3.select("#bias").node().value;
	
	d3.select('#noisy').attr('width', lengthH * size).attr('height', lengthV * size).style('display', 'none');	
	d3.select('#output').attr('width', lengthH * size).attr('height', lengthV * size).style('display', 'block');	
	
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, lengthH * size, lengthV * size);

	for (var x = 0; x < lengthH; x++) {
		for (var y = 0; y < lengthV; y++) {
			handleColours(colours, context, size, x, y, bias);
		}
	}
	
	var dataURL = canvas.toDataURL();
	document.getElementById('output').src = dataURL;
}

function handleColours(colours, context, size, x, y, bias) {
	switch (colours) {
		case 'monochrome':
			context.fillStyle = '#000000';
			var isDrawing = Math.random() > .5;
			var chance = { verylight: .833, light: .666, none: .5, dark: .333, verydark: .166 };
			isDrawing = Math.random() > chance[bias];
			if (isDrawing) {						
				context.fillRect(x * size, y * size, size, size);
			}
			break;
		case 'greyscale':
			var ranges = { verylight: [255 / 2, 255], light: [255 / 4, 255], none: [0, 255], dark: [0, 255 / 2], verydark: [0, 255 / 4]}
			var start, end;
			[start, end] = ranges[bias];
			var grey = rand(start, end);
			context.fillStyle = 'rgb(' + grey + ',' + grey + ',' + grey + ')';
			context.fillRect(x * size, y * size, size, size);
			break;	
		case 'rgb_3bit':
			context.fillStyle = 'rgb(' + rand(0, 1) * 255 + ',' + rand(0, 1) * 255 + ',' + rand(0, 1) * 255 + ')';
			switch (bias) {
				case 'verylight':
					context.fillStyle = randArray([ '#0FF', '#F0F', '#FF0', '#FFF' ]);
					break;
				case 'light':
					context.fillStyle = randArray([ '#0FF', '#F0F', '#FF0', '#FFF', '#0FF', '#F0F', '#FF0', '#FFF', '#F00', '#0F0', '#00F' ]);
					break;
				case 'dark':
					context.fillStyle = randArray([ '#0FF', '#F0F', '#FF0', '#000', '#F00', '#0F0', '#00F', '#000', '#F00', '#0F0', '#00F' ]);
					break;
				case 'verydark':
					context.fillStyle = randArray([ '#F00', '#0F0', '#00F', '#000' ]);
					break;							
			}					
			context.fillRect(x * size, y * size, size, size);
			break;
		case 'rgb_6bit':
			var ranges = { verylight: [2, 3], light: [1, 3], none: [0, 3], dark: [0, 2], verydark: [0, 1]}
			var start, end;
			[start, end] = ranges[bias];
			context.fillStyle = 'rgb(' + rand(start, end) * 85 + ',' + rand(start, end) * 85 + ',' + rand(start, end) * 85 + ')';
			context.fillRect(x * size, y * size, size, size);
			break;								
		case 'rgb_12bit':
			var ranges = { verylight: [3, 5], light: [1, 5], none: [0, 5], dark: [0, 4], verydark: [0, 2]}
			var start, end;
			[start, end] = ranges[bias];
			context.fillStyle = 'rgb(' + rand(start, end) * 51 + ',' + rand(start, end) * 51 + ',' + rand(start, end) * 51 + ')';
			context.fillRect(x * size, y * size, size, size);
			break;								
		case 'rgb_24bit':
			var ranges = { verylight: [170, 255], light: [128, 255], none: [0, 255], dark: [0, 128], verydark: [0, 85]}
			var start, end;
			[start, end] = ranges[bias];
			context.fillStyle = 'rgb(' + rand(start, end) + ',' + rand(start, end) + ',' + rand(start, end) + ')';
			context.fillRect(x * size, y * size, size, size);
			break;
		case 'red':
		case 'green':
		case 'blue':
			var start = 0, end = 255;
			switch (bias) {
				case 'verylight':
					[start, end] = [170, 255];
					break;
				case 'light':
					[start, end] = [128, 255];
					break;
				case 'dark':
					[start, end] = [0, 128];
					break;
				case 'verydark':
					[start, end] = [0, 85];
					break;							
			}				
			switch (colours) {
				case 'red':
					context.fillStyle = 'rgb(' + rand(start, end) + ',0,0)';		
					break;
				case 'green':
					context.fillStyle = 'rgb(0,' + rand(start, end) + ',0)';		
					break;
				case 'blue':
					context.fillStyle = 'rgb(0,0,' + rand(start, end) + ')';		
					break;
			}			
			context.fillRect(x * size, y * size, size, size);
			break;
		case 'space_greyscale':
			var start = 0, end = 30;
			switch (bias) {
				case 'verylight':
					[start, end] = [10, 50];
					break;
				case 'light':
					[start, end] = [0, 40];
					break;
				case 'dark':
					[start, end] = [0, 20];
					break;
				case 'verydark':
					[start, end] = [0, 10];
					break;							
			}				
			var grey = rand(start, end);
			context.fillStyle = 'rgb(' + grey + ',' + grey + ',' + grey + ')';
			context.fillRect(x * size, y * size, size, size);
			break;	
		case 'space_all':
			var start = 0, end = 30;
			switch (bias) {
				case 'verylight':
					[start, end] = [10, 50];
					break;
				case 'light':
					[start, end] = [0, 40];
					break;
				case 'dark':
					[start, end] = [0, 20];
					break;
				case 'verydark':
					[start, end] = [0, 10];
					break;							
			}								
			context.fillStyle = 'rgb(' + rand(start, end) + ',' + rand(start, end) + ',' + rand(start, end) + ')';
			context.fillRect(x * size, y * size, size, size);
			break;									
	}
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