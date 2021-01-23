export { wrapRootElement } from './src/apollo/root-wrap-elem';

export const onInitialClientRender = () => {
  setTimeout(function() {
      document.getElementById("___loader").style.display = "none"
  }, 1000)
}