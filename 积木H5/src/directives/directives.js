const directives = {
  landingPageTitle: {
    inserted: (el, binding, vnode) => {
      window.document.title = el.dataset.pageTitle || ' ';
    },
    update: (el, binding, vnode) => {
      window.document.title = el.dataset.pageTitle || ' ';
    }
  },
  getRectEle: {
    bind: (el, binding, vnode) => {
      console.log(el.hight, 'bind', el)
    },
    inserted: (el, binding, vnode) => {
      console.log(el.hight, 'inserted', el)
    },
    update: (el, binding, vnode) => {
      console.log(el.offsetHeight, 'update', el)
    },
    componentUpdated: (el, binding, vnode) => {
      console.log(el.offsetHeight, 'componentUpdated', el)
    },
    unbind: (el, binding, vnode) => {
      console.log(el.offsetHeight, 'unbind', el)
    }
  },
  getPerformance: {
    inserted: (el, binding, vnode) => {
      console.log(window.performance.timing)
    }
  }
};

export default directives;
