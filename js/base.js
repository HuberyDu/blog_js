var $ = function(args) {
  return new Base(args);
}

function Base(args) {
  this.elements = [];
  if (typeof args == "string") {
    if (args.indexOf(" ") == -1) {
      switch (args.charAt(0)) {
        case '#':
          this.elements.push(this.getId(args.substring(1)));
          break;
        case '.':
          this.elements = this.getClass(args.substring(1));
          break;
        default:
          this.elements = this.getTagName(args);
          break;
      }
    } else {
      var elements = args.split(" ");
      var childElements = [];
      var node = [];
      if (node.length == 0) {
        node.push(document);
      }
      for (var i = 0; i < elements.length; i++) {
        switch (elements[i].charAt(0)) {
          case '#':
            childElements = [];
            childElements.push(this.getId(elements[i].substring(1)))
            node = childElements;
            break;
          case '.':
            childElements = [];
            for (var j = 0; j < node.length; j++) {
              var temps = this.getClass(elements[i].substring(1), node[j])
              for (var k = 0; k < temps.length; k++) {
                childElements.push(temps[k]);
              }
            }
            node = childElements;
            break;
          default:
            childElements = [];
            for (var j = 0; j < node.length; j++) {
              var temps = this.getTagName(elements[i], node[j]);
              for (var k = 0; k < temps.length; k++) {
                childElements.push(temps[k]);
              }
            }
            node = childElements;
            break;
        }
      }
      this.elements = childElements;
    }
  } else if (typeof args == 'object') {
    if (args != undefined) { //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
      this.elements[0] = args;
    }
  }
}

Base.prototype.getId = function(id, parentNode) {
  var node = null;
  if (parentNode != undefined) {
    node = parentNode;
  } else {
    node = document;
  }
  var temps = node.getElementById(id);
  return temps;
}

Base.prototype.getName = function(name) {
  name = document.getElementByName(name)
  for (var i = 0; i < name.length; i++) {
    this.elements.push(name[i]);
  }
  return this.elements

}

Base.prototype.getTagName = function(tag, parentNode) {
  var node = null;
  var temps = [];
  if (parentNode != undefined) {
    node = parentNode;
  } else {
    node = document;
  };
  tags = node.getElementsByTagName(tag);
  for (var i = 0; i < tags.length; i++) {
    temps.push(tags[i]);
  }
  return temps;
}

Base.prototype.getClass = function(classname, parentNode) {
  var node = null;
  var temps = [];
  if (parentNode != undefined) {
    node = parentNode;
  } else {
    node = document;
  };
  all = node.getElementsByTagName("*");
  for (var i = 0; i < all.length; i++) {
    if (all[i].className == classname) {
      temps.push(all[i]);
    }
  }
  return temps;
};

Base.prototype.find = function(attr) {
  var childElements = [];
  for (var i = 0; i < this.elements.length; i++) {
    switch (attr.charAt(0)) {
      case '#':
        childElements.push(this.getId(attr.substring(1), this.elements[i]));
        break;
      case '.':
        var temps = this.getClass(attr.substring(1), this.elements[i]);
        for (var j = 0; j < temps.length; j++) {
          childElements.push(temps[j])
        }
        break;
      default:
        var temps = this.getTagName(attr, this.elements[i]);
        for (var j = 0; j < temps.length; j++) {
          childElements.push(temps[j]);
        };
        break;
    }
  }
  this.elements = childElements;
  return this;
}

Base.prototype.css = function(attr, value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 1) {
      return getStyle(element, attr);
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}

Base.prototype.html = function(value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].innerHTML;
    }
    this.elements[i].innerHTML = value;
  }
  return this;
}

Base.prototype.getElement = function(num) {
  return this.elements[num];
}

Base.prototype.eq = function(num) {
  var element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this.elements[0]
}

Base.prototype.click = function(ftn) {
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i], "click", ftn)
  }
  return this;
}

Base.prototype.addClass = function(classname) {
  for (var i = 0; i < this.elements.length; i++) {
    if (!this.elements[i].className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'))) {
      this.elements[i].className += ' ' + classname
    }
  }
  return this;
}

Base.prototype.removeClass = function(classname) {
  for (var i = 0; i < this.elements.length; i++) {
    if (this.elements[i].className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'))) {
      // this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)')),' ');
    }
  }
  return this;
}

Base.prototype.addRule = function(num, selectorText, cssText, position) {
  sheet = document.styleSheets[num];
  if (typeof sheet.insertRule != "undefined") {
    sheet.insertRule(selectorText + '{' + cssText + '}', position);
  } else {
    sheet.addRule(selectorText, cssText, position);
  }
  return this;
}

Base.prototype.hover = function(over, out) {
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i], 'mouseover', over);
    addEvent(this.elements[i], 'mouseout', out);
  }
  return this;
};

//设置显示
Base.prototype.show = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'block';
  }
  return this;
}

//设置隐藏
Base.prototype.hide = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
  }
  return this;
}

//set center
Base.prototype.center = function(width, height) {
  var top = (getInner().height - height) / 2;
  var left = (getInner().width - width) / 2;
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.top = top + "px";
    this.elements[i].style.left = left + "px";
  }
  return this;
}

//触发浏览器窗口事件
Base.prototype.resize = function(fn) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    addEvent(window, 'resize', function() {
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


Base.prototype.lock = function() {
  var width = getInner().width
  var height = getInner().height;
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.width = width + "px";
    this.elements[i].style.height = height + "px";
    this.elements[i].style.display = "block";
  }
  return this;
}

Base.prototype.unlock = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = "none";
    document.documentElement.style.overflow = 'auto';
    removeEvent(window, 'scroll', scrollTop);
  }
  return this;
}

Base.prototype.extend = function(name, ftn) {
  Base.prototype[name] = ftn;
}

Base.prototype.ready = function(fn) {
  addDomLoaded(fn);
}

Base.prototype.ge = function(num) {
  return this.elements[num];
}

Base.prototype.first = function() {
  return this.elements[0];
}

Base.prototype.last = function() {
  return this.elements[this.elements.length - 1];
}

//设置动画
//设置动画
Base.prototype.animate = function (obj) {
  for (var i = 0; i < this.elements.length; i ++) {
    var element = this.elements[i];
    var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
             obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
             obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

    
    var start = obj['start'] != undefined ? obj['start'] : 
            attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
                           parseInt(getStyle(element, attr));
    
    var t = obj['t'] != undefined ? obj['t'] : 10;                        //可选，默认10毫秒执行一次
    var step = obj['step'] != undefined ? obj['step'] : 20;               //可选，每次运行10像素
    
    var alter = obj['alter'];
    var target = obj['target'];
    var mul = obj['mul'];
    
    var speed = obj['speed'] != undefined ? obj['speed'] : 6;             //可选，默认缓冲速度为6
    var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';    //可选，0表示匀速，1表示缓冲，默认缓冲
    
    
    if (alter != undefined && target == undefined) {
      target = alter + start;
    } else if (alter == undefined && target == undefined && mul == undefined) {
      throw new Error('alter增量或target目标量必须传一个！');
    }
    
    
    
    if (start > target) step = -step;

    if (attr == 'opacity') {
      element.style.opacity = parseInt(start) / 100;
      element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
    } else {
      element.style[attr] = start + 'px';
    }

    if (mul == undefined) {
      mul = {};
      mul[attr] = target;
    }

    clearInterval(element.timer);
    element.timer = setInterval(function () {

      for (var i in mul) {
        attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
        target = mul[i];

        if (type == 'buffer') {
          step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                             (target - parseInt(getStyle(element, attr))) / speed;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
        }

        if (attr == 'opacity') {
          if (step == 0) {
            setOpacity();
          } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
            setOpacity();
          } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
            setOpacity();
          } else {
            var temp = parseFloat(getStyle(element, attr)) * 100;
            element.style.opacity = parseInt(temp + step) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
          }

        } else {
          if (step == 0) {
            setTarget();
          } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
            setTarget();
          } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
            setTarget();
          } else {
            element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
          }
        }

      }
      //document.getElementById('aaa').innerHTML += step + '<br />';
    }, t);

    function setTarget() {
      element.style[attr] = target + 'px';
      clearInterval(element.timer);
      if (obj.fn != undefined) obj.fn();
    }

    function setOpacity() {
      element.style.opacity = parseInt(target) / 100;
      element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
      clearInterval(element.timer);
      if (obj.fn != undefined) obj.fn();
    }
  }
  return this;
};
