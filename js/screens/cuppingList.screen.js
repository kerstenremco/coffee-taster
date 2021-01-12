import Screen from './screen.class';

class cuppingList extends Screen {
	constructor(firstName, cuppings, handleCuppingListClick) {
		super();
		this.firstName = firstName;
		this.cuppings = cuppings;
		this.handleCuppingListClick = handleCuppingListClick;
	}

	render() {
		this.html = `
			<div class="screen flex" id="screen-cupping">
        <h1 class="cupping-welcome">
            <span class="name">${this.firstName}</span>, het is een <span>altijd</span> een goed moment voor <span>koffie!</span>
        </h1>
        <div class="flex1" id="cuppings-list">
				</div>
    </div>
		`;

		super.render();

		const htmlListElement = document.getElementById("cuppings-list");
		this.cuppings.forEach(cupping => cupping.renderOnList(htmlListElement, this.handleCuppingListClick));
	}
}

export default cuppingList;