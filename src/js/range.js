// <!-- Forked from Chris Coyier's pen : https://codepen.io/chriscoyier/pen/eYNQyPe -->


exports.setBubble = function(range, bubble) {
	const val = range.value;

	const min = range.min;
	const max = range.max;

	const offset = Number(((val - min) * 100) / (max - min));

	bubble.textContent = val;

	// yes, 14px is a magic number
	bubble.style.left = `calc(${offset}% - 14px)`;
};
