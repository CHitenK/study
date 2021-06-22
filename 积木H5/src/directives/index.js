import directive from './directives';

const importDirective = Vue => {
    Vue.directive('landingPageTitle', directive.landingPageTitle);
    Vue.directive('getRectEle', directive.getRectEle);
    Vue.directive('getPerformance', directive.getPerformance);
};

export default importDirective;
