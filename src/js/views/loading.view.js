import Logo from '../../img/logo.png';

class LoadingView {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  render() {
    this.htmlElement.innerHTML = `
			<div class="screen flex" id="screen-loading">
        <img src="${Logo}" alt="Coffee taster logo" class="logo"/>
        <div class="loader">Loading...</div>
    	</div>
		`;
  }
}

export default LoadingView;