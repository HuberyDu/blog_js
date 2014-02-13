var $ = function(){
  return new Base();
}

function Base(){
  this.elements = [];
}

Base.prototype.getId = function(id){
  this.elements.push(document.getElementById(id))
  return this;
}

Base.prototype.getName = function(name){
  name = document.getElementByName(name)
  for(var i=0; i<name.length; i++){
    this.elements.push(name[i]);
  }
  return this;
}

Base.prototype.getTagName = function(tag){
  tags = document.getElementsByTagName(tag);
  for(var i=0; i<tags.length; i++){
    this.elements.push(tags[i]);
  }
  return this;
}

Base.prototype.css = function(attr, value){
  for(var i=0;i<this.elements.length ;i++){
    if(arguments.length == 1){
      return getStyle(element, attr);
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}

Base.prototype.html = function(value){
  for(var i=0; i<this.elements.length;i++){
    if(arguments.length == 0){
      return this.elements[i].innerHTML;
    }
    this.elements[i].innerHTML = value;
  }
  return this;
}

Base.prototype.getClass = function(classname) {
  all = document.getElementsByTagName("*");
  for(var i=0; i<all.length;i++){
    if(all[i].className == classname){
      this.elements.push(all[i]);
    }
  }
  return this;
};

Base.prototype.getElement = function(num){
  return this.elements[num];
}

Base.prototype.eq = function(num){
  var element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this.elements[0]
}

Base.prototype.click = function(ftn){
  for(var i=0; i<this.elements.length;i++){
    addEvent(this.elements[i],"click",ftn)
  }
  return this;
}

Base.prototype.addClass = function(classname){
  for(var i=0;i<this.elements.length;i++){
    if(!this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
      this.elements[i].className += ' '+classname
    }
  }
  return this;
}

Base.prototype.removeClass = function(classname){
  for(var i=0;i<this.elements.length;i++){
    if(this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
      // this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)')),' ');
    }
  }
  return this;
}

Base.prototype.addRule = function(num,selectorText, cssText, position){
  sheet = document.styleSheets[num];
  if (typeof sheet.insertRule != "undefined"){
    sheet.insertRule(selectorText + '{'+ cssText +'}', position);
  }else{
    sheet.addRule(selectorText,cssText, position);
  }
  return this;
}

Base.prototype.hover = function (over, out) {
  for (var i = 0; i < this.elements.length; i ++) {
    addEvent(this.elements[i], 'mouseover', over);
    addEvent(this.elements[i], 'mouseout', out);
  }
  return this;
};

//设置显示
Base.prototype.show = function () {
  for (var i = 0; i < this.elements.length; i ++) {
    this.elements[i].style.display = 'block';
  }
  return this;
}

//设置隐藏
Base.prototype.hide = function () {
  for (var i = 0; i < this.elements.length; i ++) {
    this.elements[i].style.display = 'none';
  }
  return this;
}

//set center
Base.prototype.center = function(width, height){
  var top = (getInner().height - height)/2;
  var left = (getInner().width - width)/2;
  for (var i = 0; i < this.elements.length; i ++) {
    this.elements[i].style.top = top + "px";
    this.elements[i].style.left = left + "px";
  }
  return this;
}

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
  for (var i = 0; i < this.elements.length; i ++) {
    var element = this.elements[i];
    addEvent(window, 'resize', function () {
      fn();
      if (element.offsetLeft > getInner().width - element.offsetWidth) {
        element.style.left = getInner().width - element.offsetWidth + 'px';
      }
      if (element.offsetTop > getInner().height - element.offsetHeight) {
        element.style.top = getInner().height - element.offsetHeight + 'px';
      }
    });
  }
  return this;
}


Base.prototype.lock = function(){
  var width = getInner().width
  var height = getInner().height;
  for (var i = 0; i < this.elements.length; i ++) {
    this.elements[i].style.width = width + "px";
    this.elements[i].style.height = height + "px";
    this.elements[i].style.display = "block";
  }
  return this;
}

Base.prototype.unlock = function(){
  for (var i = 0; i < this.elements.length; i ++) {
    this.elements[i].style.display = "none";
    document.documentElement.style.overflow = 'auto';
    removeEvent(window, 'scroll', scrollTop);
  }
  return this;
}

Base.prototype.extend = function(name, ftn){
  Base.prototype[name] = ftn;
}