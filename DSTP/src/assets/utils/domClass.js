var domClass = {
    hasClass(obj,cls) {
        return obj ? obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
    },
    addClass(obj,cls) {
        if (obj && !domClass.hasClass(obj,cls)) obj.className += " " + cls;
    },
    removeClass(obj,cls) {
        if (domClass.hasClass(obj,cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    toggleClass(obj,cls){
        if(domClass.hasClass(obj,cls)){
            domClass.removeClass(obj,cls);
        }else{
            domClass.addClass(obj,cls);
        }
    }
}
module.exports = domClass
