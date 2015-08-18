

function RPictures(element, options){
	var _self = this;

	this.options = options || {};
	this.element = document.getElementById(element);//活动UL的父级DIV
	this.init();
	this.initList();
}
RPictures.prototype.init = function(){
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

	this.element.getElementsByTagName('ul')[0].style.listStyle = 'none';
	this.element.getElementsByTagName('ul')[0].style.margin = 0;
	this.element.getElementsByTagName('ul')[0].style.padding = 0;
}
RPictures.prototype.initList = function(){
	for(var i=0; i<this.eleList.length; i++){

		var elel = this.eleList[i];
		elel.style.cssFloat = 'left';
		elel.style.styleFloat = 'left';
		elel.style.float = 'left';
		elel.style.height = this.divHeight+'px';
		elel.style.width = this.normalWidth+'px';
		elel.style.borderRight = this.borderWidth+'px solid #fff';
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

		this.mouseoverfun = this.mouseoverFun.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseover",this.mouseoverfun , false) : elel.attachEvent("onmouseover",this.mouseoverfun);

		this.mouseoutfun = this.mouseoutFun.bind(this);
		elel.addEventListener ? elel.addEventListener("mouseout",this.mouseoutfun, false) : elel.attachEvent("onmouseout",this.mouseoutfun);
	}
}
RPictures.prototype.mouseoverFun = function(e){
	var ele = e.target || e.srcElement;
	for(var i=0; i<this.eleList.length; i++){
		this.eleList[i].style.width = this.smallWidth+'px';
		this.eleList[i].getElementsByTagName('a')[0].style.width = this.smallWidth+'px';
	}

	while(ele.tagName != 'LI' && ele.tagName != 'BODY'){
		ele = ele.parentNode;
	}

	ele.style.width = this.bigWidth+'px';
	ele.getElementsByTagName('a')[0].style.width = this.bigWidth+'px';
}

RPictures.prototype.mouseoutFun = function(){
	for(var i=0; i<this.eleList.length; i++){
		this.eleList[i].style.width = this.normalWidth+'px';
		this.eleList[i].getElementsByTagName('a')[0].style.width = this.normalWidth+'px';
	}
}