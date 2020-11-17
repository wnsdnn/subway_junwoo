$(document).ready(function () {
	// 이미지 올라오는 효과
	const banner = $('#main > #banner');
	$(banner).find('h2').animate({ opacity: '1', top: '0' }, 700);
	$(banner).find('p').delay(300).animate({ opacity: '1', top: '0' }, 700);
	$(banner).find('.img').delay(300).animate({ opacity: '1', top: '0' }, 700);

	// 메뉴 스크롤시 변경
	const subHeader = $('#main > #sub-header');
	const subTop = $(subHeader).find('.top');
	const subHeaderTop = $(subHeader).offset().top; // 특정 요소에 top 위치
	console.log(subHeaderTop);

	function scrollSubHeader() {
		$(window).on('scroll', function () {
			const scroll = $(window).scrollTop();

			if (scroll > subHeaderTop) {
				$(subHeader).addClass('fixed');
			} else {
				$(subHeader).removeClass('fixed');
			}
		});
	}

	$(subTop).on('click', function () {
		$('html, body').stop(true, false).animate(
			{
				scrollTop: 0,
			},
			1000,
		);
	});

	scrollSubHeader();

	// 메뉴 hover
	let menu = $('#menu ul > li');

	function menuDetailShow(event) {
		const target = event.currentTarget;
		const menuKtitle = $(target).find('.ktitle');
		const menuEtitle = $(target).find('.etitle');
		const menuDesc = $(target).find('.desc');
		const menuMore = $(target).find('.icon');

		$(menuKtitle).stop().animate({ top: '50px' }, 400);
		$(menuEtitle).stop().animate({ top: '95px' }, 400);
		$(menuDesc).stop().animate({ top: '125px', opacity: '1' }, 500);
		$(menuMore).stop().animate({ bottom: '30px', opacity: '1' }, 300);
	}

	function menuDetailHide(event) {
		const target = event.currentTarget;
		const menuKtitle = $(target).find('.ktitle');
		const menuEtitle = $(target).find('.etitle');
		const menuDesc = $(target).find('.desc');
		const menuMore = $(target).find('.icon');

		$(menuKtitle).stop().animate({ top: '100px' });
		$(menuEtitle).stop().animate({ top: '145px' });
		$(menuDesc).stop().animate({ top: '200px', opacity: '0' });
		$(menuMore).stop().animate({ bottom: '100px', opacity: '0' });
	}

	$(menu).on('mouseenter', menuDetailShow);

	$(menu).on('mouseleave', menuDetailHide);

	/* 탭 */
	const menuTab = $('#menu-tab ul > li');

	$(menuTab).on('click', function (e) {
		const currentTarget = e.currentTarget;
		const menuName = $(currentTarget).data('menu');

		$(menuTab).removeClass('active');
		$(currentTarget).addClass('active');

		menu = $('#menu ul > li');
		$(menu)
			.stop()
			.animate({ opacity: '0' }, function () {
				$(menu).css('display', 'none');

				if (menuName === 'all') {
					$(menu).stop().css('display', 'block').animate({ opacity: '1' });
				} else {
					$(`.${menuName}`)
						.stop()
						.css('display', 'block')
						.animate({ opacity: '1' });
				}
			});
	});

	// menu api
	function getSandwich() {
		return fetch('http://localhost:3000/survey/sandwich', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res)
			.then((res) => res.json());
	}

	function templateSandwichLabel(label) {
		if (label) {
			return `<div class="label">${label}</div>`;
		} else {
			return '';
		}
	}

	function templateSandwichKcal(kcal) {
		if (kcal) {
			return `<span class="kcal">${kcal}</span>`;
		} else {
			return '';
		}
	}

	function templateSandwichView(viewId) {
		if (viewId) {
			return `<div class="icon" data-id="${viewId}"></div>`;
		} else {
			return '';
		}
	}

	function templateSandwich(sandwich) {
		const {
			type,
			label,
			img,
			ko_title,
			en_title,
			kcal,
			summary,
			view_id,
		} = sandwich;

		return `
      <li class="${type}">
        <a href="#">
          ${templateSandwichLabel(label)}
          <div class="img">
            <img src="${img}" alt="${ko_title}">
          </div>
          <strong class="ktitle">${ko_title}</strong>
          <span class="etitle">${en_title}</span>
          ${templateSandwichKcal(kcal)}
          <p class="desc">${summary}</p>
          ${templateSandwichView(view_id)}          
        </a>
      </li>
    `;
	}

	async function listSandwich() {
		const sandwiches = await getSandwich();
		console.log(sandwiches);
		const menu = document.getElementById('menu');
		const menuWrap = menu.querySelector('ul');

		for (let i = 0; i < sandwiches.length; i++) {
			const sandwich = sandwiches[i];
			const node = $(templateSandwich(sandwich))[0];
			$(node).on('mouseenter', menuDetailShow);
			$(node).on('mouseleave', menuDetailHide);
			menuWrap.append(node);
		}
	}

	listSandwich();
});
