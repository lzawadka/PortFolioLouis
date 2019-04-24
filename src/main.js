var utils = {
	norm: function(value, min, max) {
		return (value - min) / (max - min);
	},

	lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	},

	map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	},

	clamp: function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	},

	distance: function(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	distanceXY: function(x0, y0, x1, y1) {
		var dx = x1 - x0,
			dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	},

	circleCollision: function(c0, c1) {
		return utils.distance(c0, c1) <= c0.radius + c1.radius;
	},

	circlePointCollision: function(x, y, circle) {
		return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	},

	pointInRect: function(x, y, rect) {
		return utils.inRange(x, rect.x, rect.x + rect.width) &&
		       utils.inRange(y, rect.y, rect.y + rect.height);
	},

	inRange: function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	},

	rangeIntersect: function(min0, max0, min1, max1) {
		return Math.max(min0, max0) >= Math.min(min1, max1) && 
			   Math.min(min0, max0) <= Math.max(min1, max1);
	},

	rectIntersect: function(r0, r1) {
		return utils.rangeIntersect(r0.x, r0.x + r0.w, r1.x, r1.x + r1.w) &&
			   utils.rangeIntersect(r0.y, r0.y + r0.h, r1.y, r1.y + r1.h);
	},

	degreesToRads: function(degrees) {
		return degrees / 180 * Math.PI;
	},

	radsToDegrees: function(radians) {
		return radians * 180 / Math.PI;
	},

	randomRange: function(min, max) {
		return min + Math.random() * (max - min);
	},

	randomInt: function(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	}

}
	
	var vector = {
	_x: 1,
	_y: 0,

	create: function(x, y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	}
};
	
	full = {
	x:window.innerWidth,
	y:window.innerHeight
	}
	
// set Canvas	

	canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
	W= width = canvas.width = full.x;
	H = height = canvas.height = full.y;
		var mouse = {
	    x: 0,
	    y: 0
	};
	canvas.addEventListener('mousemove', function(e) {
	    mouse.x = e.pageX - this.offsetLeft;
	    mouse.y = e.pageY - this.offsetTop;
	}, false);

	number =80;
	vectorStock=[];
		for(i = 0; i <  W/number+1; i++) {

					for(j = 0; j <  H/number+1; j++) {

				vectorStock.push(vector.create(i*number,j*number));
					
}		
}
			
	function update(){
	context.clearRect(0,0,W,H);
	
		for(i = 0; i <  vectorStock.length; i++) {
	    
	    dx = vectorStock[i].getX()- mouse.x;
	    dy = vectorStock[i].getY()- mouse.y;
			    dist = 10+Math.sqrt(dx * dx + dy * dy);
		if(dist > dist/4){

				dist = dist/4;

		}
		
		
	 deltaX = vectorStock[i].getX() - mouse.x;
	 deltaY = vectorStock[i].getY()- mouse.y;
	
	context.fillStyle="#3926E2";
	context.save();

	context.translate(vectorStock[i].getX(),vectorStock[i].getY())
	context.rotate(Math.atan2(deltaY, deltaX));
	
		context.fillRect(0,0,-dist/4,1);
		

	context.restore();
	
	}
	requestAnimationFrame(update);
	}

	update();