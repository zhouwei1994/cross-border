//基于JQ的iframe处理插件
const $iframe = function (config){
	this.option = {
		el:'',				//iframe JQ对象
		hideAll:false,		//是否需要隐藏网页所有元素（ps：隐藏全部然后显示需要的元素）
		domShow:[],
		style:'',			//默认加载样式 需要是文本,如果需要加载多个样式可获取后自加
		height:'auto',		//默认iframe与网页高度同步
		scrolling:false,	//是否显示滚动条
	};
	$.extend(this.option,config);
	if(!this.option.el){
		throw new Error("iframe对象不能为空");
		return;
	}
	this._init();
}
$iframe.prototype = {
	_init:function(){
		//初始化iframe内容对象
		let _this = this;
		this._contents = this.option.el.contents();
		//是否隐藏全部
		if(this.option.hideAll) {
			this.iframeEl("*").addClass("hide");
			//默认显示
			this.domShow(this.option.domShow);
		}
		//默认样式
		let defaultStyle = '<style>.hide{display: none !important;}</style>';
		this.iframeAddClass(defaultStyle + this.option.style);
		_this._setHeight(_this.option.height)
		if(_this.option.height =='auto'){
			if(window.setHeight) clearTimeout(window.setHeight);
			window.setHeight = setTimeout(function(){
				_this._setHeight(_this.option.height)
			},500);
		}
		let scrolling = this.option.scrolling ? 'yes':'no';
		this.option.el.attr("scrolling",scrolling);
	},
	_setHeight:function(height){
		height = height == 'auto' ? this.iframeEl('body').height():height;
		this.option.el.attr("height",height);
	},
	_contents: null,
	iframeEl:function(el){
		return el == undefined ? this._contents:this._contents.find(el);
	},
	val:function(){
		return this.option.el.get(0).contentWindow;
	},
	iframeAddClass:function(styleText){
		//向iframe加载文本样式，推荐用html格式保存<style></style>
		if(!styleText) {
			console.log("没有获取到样式，加载失败");
			return;
		}
		this.iframeEl("body").prepend(styleText);
	},
	domShow:function(elArr){
		for(let el of elArr){
			//显示对应块
			el = typeof el =="string" ? this.iframeEl(el) : el;
			el.removeClass("hide");
			this.allOperate(el,function(all){
				all.removeClass("hide");
			},{'parent':true,'children':true})
		}
	},
	domHide:function(elArr){
		for(let el of elArr){
			//隐藏对应块
			el = typeof el =="string" ? this.iframeEl(el) : el;
			el.addClass("hide");
		}
	},
	allOperate:function(el,callback,opt){
		//操作所有父级子级
		if(opt.parent) elOperate(el,el => el.parent());
		if(opt.children) elOperate(el,el => el.children());
		function elOperate(el,getElNext){
			var elNext = getElNext(el);
			callback(elNext);
			if(elNext.length !== 0){
				elOperate(elNext,getElNext);
			}
		}
	}
}
export default $iframe
