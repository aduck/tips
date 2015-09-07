var UiTips=function(){
	var tips;
	function Each(elem,callback){
		if(elem.length){
			var i,len=elem.length;
			for(i=0;i<len;i++){
				callback.apply(elem[i],arguments);
			}
		}else{
			var i;
			for(i in elem){
				callback.apply(elem[i],arguments);
			}
		}
	}
	function binder(elem,type,func){
		if(elem.addEventListener){
			elem.addEventListener(type,func,false);
		}else if(elem.attachEvent){
			G_FUNC=function(){
				func.apply(elem,arguments);
			}
			elem.attachEvent("on"+type,G_FUNC);
		}
	}
	function createTips(opts){
		var opts=opts||{},
			position=opts.position||"top";
		tips=document.createElement("div");
		if(position=="top"){
			tips.className="ui-tips";
		}else if(position=="bottom"){
			tips.className="ui-tips ui-tips-bottom";
		}
		tips.innerHTML=this.getAttribute("data-title");
		if(tips.innerHTML){
			this.style.position="relative";
			this.appendChild(tips);
			tips.style.marginLeft=-parseInt(tips.clientWidth)/2+"px"
		}
	}
	function unsetTips(){
		if(tips){
			this.removeChild(tips);
		}
	}
	return {
		init:function(elem,opts){
			Each(elem,function(){
				var that=this;
				binder(that,"mouseover",function(){
					createTips.call(that,opts);
				});
				binder(that,"mouseout",function(){
					unsetTips.apply(that,arguments);
				});
			});
		}
	}
}();
window.UiTips=UiTips;