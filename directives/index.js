export const imageError = {
  inserted(el, binding) {

    el.onerror = function() {
      el.src = binding.value
    }
  },
  componentUpdated(el,binding){
    el.src = el.src || binding.value
  }
}
