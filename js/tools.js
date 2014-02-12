function getInner(){
  if(typeof window.innerWidth != "undefined"){
    return{
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
  	return{
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}


function getStyle(element, attr){
  if(typeof window.getComputedStyle != 'undefined'){  // w3c
    return window.getComputedStyle(element,null)[attr]
  }else if(typeof element.currentStyle != "undefined"){ //IE
    return element.currentStyle[attr]
  }
}