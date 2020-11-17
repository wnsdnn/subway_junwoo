$(document).ready(function () {
	// 이미지 올라오는 효과
	const banner = $('#main > #banner');
	$(banner).find('h2').animate({ opacity: '1', top: '0' }, 700);
	$(banner).find('p').delay(300).animate({ opacity: '1', top: '0' }, 700);
	$(banner).find('.img').delay(300).animate({ opacity: '1', top: '0' }, 700);
});
