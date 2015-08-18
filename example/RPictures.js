

function RPictures(element, options){
	var _self = this;

	this.options = options || {};

	this.type = this.options.type || 'width';//展现的方式
	this.element = document.getElementById(element);//活动UL的父级DIV
	this.eleList = this.element.getElementsByTagName('li');//活动UL里的所有li

	this.eleStyle = this.element.style;//父级div的style
	this.divHeight = this.options.divHeight;//options中定义的最外层div高度
	this.borderWidth = this.options.borderWidth;//options中定义的图片右侧的边框
	this.bigWidth = this.options.bigWidth;//options中定义的图片最大化显示大小

	if(this.options.divWidth){
		this.divWidth = this.options.divWidth;//options中定义的最外层div宽度
		this.normalWidth = parseInt(this.divWidth / this.eleList.length) - this.borderWidth;//options中定义的图片正常显示大小
	}else{
		this.normalWidth = this.options.normalWidth;
		this.divWidth = (this.normalWidth + this.borderWidth) * this.eleList.length;
	}
	this.smallWidth = parseInt((this.divWidth - this.bigWidth - this.borderWidth)/(this.eleList.length-1)) - this.borderWidth;
	this.transitionTime = this.options.transitionTime;//options中定义的图片过渡时间

	this.eleStyle.width = this.divWidth+'px';
	this.eleStyle.height = this.divHeight+'px';
	this.eleStyle.overflow = 'hidden';
	this.eleStyle.position = 'relative';

	this.element.getElementsByTagName('ul')[0].style.listStyle = 'none';
	this.element.getElementsByTagName('ul')[0].style.margin = 0;
	this.element.getElementsByTagName('ul')[0].style.padding = 0;
	this.element.getElementsByTagName('ul')[0].style.width = this.divWidth+'px';
	this.element.getElementsByTagName('ul')[0].style.height = this.divHeight+'px';
	this.element.getElementsByTagName('ul')[0].style.overflow = 'hidden';
	this.element.getElementsByTagName('ul')[0].style.position = 'relative';
	if(this.type == 'width'){
		this.initWidth();
	}else{
		this.initLeft();
	}
}
RPictures.prototype.initLeft = function(){
	for(var i=0; i<this.eleList.length; i++){
		var elel = this.eleList[i];
		elel.style.position = 'absolute';
		elel.style.top = 0;
		elel.style.left = (this.normalWidth+this.borderWidth)*i+'px';
		elel.style.borderLeft = this.borderWidth+'px solid #fff';
		elel.style.transition = 'left '+this.transitionTime+'s';
		elel.style['-moz-transition'] = 'left '+this.transitionTime+'s';
		elel.style['-webkit-transition'] = 'left '+this.transitionTime+'s';
		elel.style['-o-transition'] = 'left '+this.transitionTime+'s';

		this.mouseoverfun = this.mouseoverFunLeft.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseover",this.mouseoverfun , false) : elel.attachEvent("onmouseover",this.mouseoverfun);

		this.mouseoutfun = this.mouseoutFunLeft.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseout",this.mouseoutfun, false) : elel.attachEvent("onmouseout",this.mouseoutfun);
	}
}
RPictures.prototype.mouseoverFunLeft = function(e){
	var ele = e.target || e.srcElement;
	while(ele.tagName != 'LI' && ele.tagName != 'BODY'){
		ele = ele.parentNode;
	}
	var flag = false;
	for(var i=0; i<this.eleList.length; i++){
		if(i!=0){
			if(flag){
			this.eleList[i].style.left = (i-1)*this.smallWidth+this.bigWidth+'px';
			}else{
				this.eleList[i].style.left = i*this.smallWidth+'px';
			}
		}
		if(this.eleList[i] == ele){
			flag = true;
		}
	}
}

RPictures.prototype.mouseoutFunLeft = function(){
	for(var i=0; i<this.eleList.length; i++){
		this.eleList[i].style.left = this.normalWidth*i+'px';
	}
}
RPictures.prototype.initWidth = function(){
	for(var i=0; i<this.eleList.length; i++){

		var elel = this.eleList[i];
		elel.style.cssFloat = 'left';
		elel.style.styleFloat = 'left';
		elel.style.float = 'left';
		elel.style.height = this.divHeight+'px';
		elel.style.width = this.normalWidth+'px';
		elel.style.borderLeft = this.borderWidth+'px solid #fff';
		elel.style.overflow = 'hidden';
		elel.style.transition = 'width '+this.transitionTime+'s';
		elel.style['-moz-transition'] = 'width '+this.transitionTime+'s';
		elel.style['-webkit-transition'] = 'width '+this.transitionTime+'s';
		elel.style['-o-transition'] = 'width '+this.transitionTime+'s';

		var elea = elel.getElementsByTagName('a')[0];
		elea.style.display = 'block';
		elea.style.height = this.divHeight+'px';
		elea.style.width = this.normalWidth+'px';
		elea.style.position = 'relative';
		elea.style.overflow = 'hidden';
		elea.style.transition = 'width '+this.transitionTime+'s';
		elea.style['-moz-transition'] = 'width '+this.transitionTime+'s';
		elea.style['-webkit-transition'] = 'width '+this.transitionTime+'s';
		elea.style['-o-transition'] = 'width '+this.transitionTime+'s';

		var elep = elea.getElementsByTagName('img')[0];
		elep.style.width = this.bigWidth+'px';
		elep.style.height = this.divHeight+'px';

		this.mouseoverfun = this.mouseoverFunWidth.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseover",this.mouseoverfun , false) : elel.attachEvent("onmouseover",this.mouseoverfun);

		this.mouseoutfun = this.mouseoutFunWidth.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseout",this.mouseoutfun, false) : elel.attachEvent("onmouseout",this.mouseoutfun);
	}
}
RPictures.prototype.mouseoverFunWidth = function(e){
	var ele = e.target || e.srcElement;
	while(ele.tagName != 'LI' && ele.tagName != 'BODY'){
		ele = ele.parentNode;
	}
	for(var i=0; i<this.eleList.length; i++){
		if(this.eleList[i] == ele){
			ele.style.width = this.bigWidth+'px';
			ele.getElementsByTagName('a')[0].style.width = this.bigWidth+'px';
		}else{
			this.eleList[i].style.width = this.smallWidth+'px';
			this.eleList[i].getElementsByTagName('a')[0].style.width = this.smallWidth+'px';
		}
	}
}

RPictures.prototype.mouseoutFunWidth = function(){
	for(var i=0; i<this.eleList.length; i++){
		this.eleList[i].style.width = this.normalWidth+'px';
		this.eleList[i].getElementsByTagName('a')[0].style.width = this.normalWidth+'px';
	}
}