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
	function contains(e1,e2){
		if(e1.contains){
			return e1!=e2&&e1.contains(e2);
		}else if(e1.compareDocumentPosition){
			return e1.compareDocumentPosition(e2)==16;
		}
	}
	function createTips(opts){
		var opts=opts||{},
			position=opts.position||"bottom";
		tips=document.createElement("div");
		if(position=="bottom"){
			tips.className="ui-tips";
		}else if(position=="top"){
			tips.className="ui-tips ui-tips-top";
		}
		tips.innerHTML=this.getAttribute("data-title");
		if(tips.innerHTML){
			this.style.position="relative";
			this.appendChild(tips);
			tips.style.marginLeft=-parseInt(tips.clientWidth)/2+"px";
		}
	}
	function unsetTips(){
		if(contains(this,tips)){
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