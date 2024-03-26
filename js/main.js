import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// 장바구니
// 드롭다운 메뉴 이벤트 버블링

const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if(basketEl.classList.contains('show')) { // contains()는 해당 클래스가 있으면 true, 없으면 false를 반환함
    // basket 요소에 show 클래스가 있다면 제거해줘야 메뉴 숨김 처리됨
    hideBasket()
  } else {
    // basket 요소에 show 클래스가 없다면 생성해서 메뉴가 보여지게 함
    showBasket()
  }
})
basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function () {
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}


// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]


searchStarterEl.addEventListener('click', showSearch) 
// 두번째 인수에는 어차피 익명함수가 들어가는 자리이기 때문에 함수 안에 또 함수를 호출하는 게 아니라 만들어져 있는 함수데이터를 넣어줘도 됨
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation()
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ''
}
function playScroll() {
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')

}


// 헤더 메뉴 토글!
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function() {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})


// 헤더 검색!
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile')
})


// 
window.addEventListener('resize', function () {
  if (this.window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})


// 모바일 환경에서 네비게이션 토글 버튼
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu()
  } else {
    showNavMenu()
  }
})

navEl.addEventListener('click', function (event) {
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}



// 요소의 가시성 관찰 (해당 요소가 화면에 보여지는지 안보여지는지)
// info 부분이 화면에 들어왔을 때 나타나는 동작을 만들기 위해 작성
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return 
      // entry.isIntersecting 값이 false가 되면
      // 뒤에 코드를 실행하지 않고 함수를 종료시킴
      // !entry.isIntersecting = entry.isIntersecting 값이 false일 때 ! 를 통해 true가 되어 if 구문이 실행됨
    }
    entry.target.classList.add('show')
    // 화면에 요소가 보이면 entry.target 속성으로 화면에 보이는 해당요소를 찾아 show 라는 클래스를 추가시킴
    // show 클래스가 붙으면서 css 내용이 동작하게 됨
  })
})
// entries: 배열 데이터가 들어옴

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


// video 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  // play() : 비디오 재생시키는 메소드
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
  // play 버튼을 눌렀을 때, play 버튼은 사라지고 일시정지 버튼이 나타나야 함

})
pauseBtn.addEventListener('click', function () {
  video.pause()
  // play() : 비디오 일시정지시키는 메소드
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
  // pause 버튼을 눌렀을 때, pause 버튼은 사라지고 재생 버튼이 나타나야 함

})


// Compare 부분 요소 삽입
// '당신에게 맞는 iPad는?' 랜더링!
// ipad.js 파일을 import 키워드로 모듈로 연결함
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `
    // 보간법 사용을 위해 백틱 기호 사용
    // html 하이라이팅되는 거 쓸 때도 백틱 기호 사용

  itemsEl.append(itemEl)
})


// Navigations 정보 입력
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')
  
  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
    <li><a href="${map.url}">${map.name}</a></li>
    `
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class='icon'>+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


// copyright 연도 넣기
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


// 모바일 모드에서 네비게이션
const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function () {
    el.classList.toggle('active')
  })
})